import Navbar from "../../components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, clearErrors } from "../../actions/productActions";
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { message } from "antd"; 

export default function Home() {
    const dispatch = useDispatch();

    const { error, loading, products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(allProducts());

        if (error) {
            message.error(error);
            dispatch(clearErrors());
        }
    }, [error, dispatch]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
            minimumFractionDigits: 2,
        }).format(price);
    };

    // Carousel item template
    const carouselItemTemplate = (product) => {
        return (
            <div className="product-item flex flex-col items-center">
                <img
                    src={product.images[0]?.url || "/images/placeholder.jpg"}
                    alt={product.name}
                    style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                    }}
                    className="rounded shadow-md"
                />
                <p className="text-lg font-medium mt-2">{product.name}</p>
                <p className="text-sm text-gray-500">{product.description}</p>
                <Tag severity="success" value={formatPrice(product.price)} className="mt-2" />
                <Button label="Add to Cart" className="mt-2 p-button-success" />
            </div>
        );
    };

    return (
        <div className="container mx-auto py-32 bg-gray-100">
            <Navbar />

            {/* Main Content */}
            <div className="flex flex-1 justify-center items-center w-full">
                <div className="flex flex-col xl:flex-row gap-10 xl:gap-16 justify-center px-10 sm:px-20 md:px-32 lg:px-40 xl:px-48">
                    <div className="xl:w-3/6 flex justify-center text-center xl:text-left items-center font-montserrat">
                        <div className="flex flex-col justify-center items-center xl:items-start gap-4 font-serif">
                            <p className="text-6xl font-bold text-[#D56F00]">
                                Silog na Mabilis,
                            </p>
                            <p className="text-2xl text-zinc-500 font-semibold">
                                Sarap na Walang Kaparis!
                            </p>
                            <Button label="Order Now" className="bg-[#D56F00] text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-[#E57C00] transition duration-300" />
                        </div>
                    </div>

                    <div className="xl:w-3/6 flex justify-center items-center">
                        <img
                            src="/images/food.jpg"
                            className="rounded-full shadow-lg"
                            style={{
                                width: "600px",
                                height: "600px",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Menu Carousel */}
            <div id="menu" className="flex flex-col gap-12 px-10 sm:px-20 md:px-32 lg:px-40 xl:px-48">
                <div className="flex flex-row justify-center items-center font-cursive">
                    <p className="font-normal text-4xl">We Serve</p>
                </div>

                {loading ? (
                    <p>Loading products...</p>
                ) : (
                    <Carousel
                        value={products}
                        itemTemplate={carouselItemTemplate}
                        numVisible={3}
                        numScroll={1}
                        className="custom-carousel"
                    />
                )}
            </div>
        </div>
    );
}
