import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  InputNumber,
  Modal,
  Button,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {
  allProducts,
  createProduct,
  resetUpdateProduct,
} from "../../actions/productActions.jsx";
import ProductList from "./ProductList";

export default function Products() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [fileList, setFileList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { error, success, products } = useSelector((state) => state.products);

  const {
    error: createError,
    loading: createLoading,
    success: createSuccess,
  } = useSelector((state) => state.createProduct);

  useEffect(() => {
    dispatch(allProducts());

    if (createSuccess) {
      message.success("Product created successfully");
      setLoading(false);
      setFileList([]);
      setName("");
      setPrice("");
      setStock("");
      setImages([]);
      setDescription("");
      setIsModalOpen(false);
    }

    if (createError) {
      message.error(createError);
      setLoading(false);
    }
  }, [createSuccess, dispatch]);

  const validateForm = () => {
    let errors = {};

    if (!name) errors.name = "Name is required";
    if (!price) errors.price = "Price is required";
    if (!description) errors.description = "Description is required";
    if (!stock) errors.stock = "Stock is required";

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
    onChange: (e) => {
      const files = e.fileList.map(file => file.originFileObj);

      const imagePromises = files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
          reader.readAsDataURL(file);
        });
      });
    
      Promise.all(imagePromises)
        .then(images => {
          setImages(images);
          setFileList(e.fileList);
        })
        .catch(error => {
          console.error('Error reading images:', error);
        });
    },
  };

  const createHandler = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("stock", stock);
    images.forEach((image) => {
      formData.append("images", image);
    });

    console.log(images, "images");

    setLoading(true);
    dispatch(createProduct(formData));
  };

  return (
    <div className="flex relative bg-zinc-100">
      <div className="sticky top-0">
    
      </div>

      <div className="flex-1 min-h-screen mx-0 transition-all duration-300 ease-in-out">
        <div className="p-8 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <p className="text-2xl">Products</p>

            <Button
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}
            >
              + Create Product
            </Button>

            <Modal
              title="Create New Product"
              open={isModalOpen}
              onOk={createHandler}
              onCancel={() => {
                setIsModalOpen(false);
                setFileList([]);
              }}
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
                    style={{
                      width: "100%",
                    }}
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
                      Stock <span className="text-red-500">*</span>
                    </p>
                    <InputNumber
                      name="stock"
                      variant="filled"
                      size="large"
                      min={0}
                      style={{
                        width: "100%",
                      }}
                      placeholder="Product Stock"
                      onChange={(value) => setStock(value)}
                      value={stock}
                      status={errors.stock ? "error" : null}
                    />
                    {errors.stock && (
                      <span className="text-red-500 text-sm">
                        {errors.stock}
                      </span>
                    )}
                  </div>
              

                <div className="space-y-1">
                  <p>
                    Description <span className="text-red-500">*</span>
                  </p>
                  <TextArea
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
          </div>

          <div>
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
