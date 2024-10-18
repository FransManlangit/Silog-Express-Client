import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
    createProduct,
    allProducts,
    singleProduct,
    updateProduct,
    clearErrors,
    resetUpdateProduct,
    deleteProduct,
    resetDeleteProduct,
} from "../../actions/productActions.jsx";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, Input, InputNumber, Button, Popconfirm, message, Upload } from "antd"; 

export default function ProductList({ products }) {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState([]);

    const { product, success: singleSuccess } = useSelector(
        (state) => state.singleProduct
    );

    const { updateSuccess } = useSelector(
        (state) => state.updateProduct
    );

    const { isDeleted } = useSelector(
        (state) => state.deleteProduct
    );

    useEffect(() => {
        if (singleSuccess) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
        }

        if (updateSuccess) {
            message.success("Product updated successfully");
            dispatch(allProducts());
            setIsModalOpen(false);
            setLoading(false);
            dispatch(resetUpdateProduct());
            setFileList([]);
        }

        if (isDeleted) {
            message.success("Product deleted successfully");
            dispatch(allProducts());
            dispatch(resetDeleteProduct());
        }
    }, [singleSuccess, product, updateSuccess, isDeleted, dispatch]);

    const showModal = (id) => {
        setIsModalOpen(true);
        dispatch(singleProduct(id));
    };

    const handleOk = () => {
        updateHandler();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setImages(null);
        setErrors({});
        setName("");
        setFileList([]);
    };

    const validateForm = () => {
        let errors = {};
        if (!name) errors.name = "Product name is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const fileProps = {
        name: "image",
        multiple: true,
        listType: "picture",
        fileList,
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: () => false,
        onChange: (info) => {
            const file = info.fileList[0]?.originFileObj;
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImages((prevImages) => [...prevImages, e.target.result]);
                };
                reader.readAsDataURL(file);
                setFileList(info.fileList);
            }
        },
    };

    const updateHandler = () => {
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        images.forEach((image) => {
            formData.append("images", image);
        });

        dispatch(updateProduct(product._id, formData));
        setLoading(true);
    };

    const deleteHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    const imagesBodyTemplate = (rowData) => {
        return (
            <img
                src={rowData?.images[0]?.url}
                alt={rowData.name}
                className="rounded"
                style={{ width: "50px", height: "auto" }}
            />
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex flex-row gap-2">
                <Button type="primary" onClick={() => showModal(rowData._id)}>
                    Edit
                </Button>
                <Popconfirm
                    title="Delete the product"
                    description="Are you sure to delete this product?"
                    onConfirm={() => deleteHandler(rowData._id)}
                    okText="Delete it"
                    cancelText="No"
                >
                    <Button danger>
                        Delete
                    </Button>
                </Popconfirm>
            </div>
        );
    };

    const formatCurrency = (value) => {
        return value.price.toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
        });
    };

    return (
        <div className="bg-white rounded p-4">
            <Modal
                title="Create New Product"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={loading}
            >
                <div className="space-y-3 py-2">
                    <div className="space-y-1">
                        <p>
                            Name <span className="text-red-500">*</span>
                        </p>
                        <Input
                            size="large"
                            type="text"
                            name="name"
                            variant="filled"
                            placeholder="Product Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            status={errors.name ? "error" : null}
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">{errors.name}</span>
                        )}
                    </div>

                    <div className="space-y-1">
                        <p>
                            Price <span className="text-red-500">*</span>
                        </p>
                        <InputNumber
                            formatter={(value) =>
                                `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value?.replace(/\₱\s?|(,*)/g, "")}
                            name="price"
                            variant="filled"
                            size="large"
                            min={0}
                            style={{ width: "100%" }}
                            placeholder="Product Price"
                            onChange={(value) => setPrice(value)}
                            value={price}
                            status={errors.price ? "error" : null}
                        />
                        {errors.price && (
                            <span className="text-red-500 text-sm">{errors.price}</span>
                        )}
                    </div>

                    <div className="space-y-1">
                        <p>
                            Description <span className="text-red-500">*</span>
                        </p>
                        <Input.TextArea
                            name="description"
                            variant="filled"
                            size="large"
                            rows={4}
                            placeholder="Product Description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            status={errors.description ? "error" : null}
                        />
                        {errors.description && (
                            <span className="text-red-500 text-sm">{errors.description}</span>
                        )}
                    </div>

                    <div className="space-y-1">
                        <p className="mb-1">Product Images</p>
                        <Upload
                            {...fileProps}
                            maxCount={10}
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </div>
                </div>
            </Modal>
            <div className="card">
                <DataTable
                    value={products}
                    tableStyle={{ minWidth: "50rem" }}
                    className="p-datatable-striped"
                    stripedRows
                    paginator
                    rows={8}
                    rowsPerPageOptions={[8, 25, 50]}
                    emptyMessage="No products found."
                >
                    <Column
                        field="name"
                        header="Name"
                        style={{ minWidth: "30rem" }}
                    ></Column>
                    <Column
                        className="font-semibold"
                        field="price"
                        header="Price"
                        body={formatCurrency}
                    ></Column>
                    <Column
                        field="images"
                        header="Image"
                        body={imagesBodyTemplate}
                    ></Column>
                    <Column
                        header="Actions"
                        body={actionBodyTemplate}
                        exportable={false}
                    ></Column>
                </DataTable>
            </div>
        </div>
    );
}
