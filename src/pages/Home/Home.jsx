import Navbar from "../../components/Navbar/Navbar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, clearErrors } from "../../actions/productActions";
import { Button } from 'primereact/button';
import { message } from "antd"; 
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';

// Add this CSS in your CSS file
import './Pagination.css'; // Make sure to replace with the correct path to your CSS file

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

    const itemTemplate = (product) => (
        <div className="product-item flex flex-col items-center p-4 bg-white shadow-lg rounded-lg" key={product._id}>
            <img
                src={product.images[0]?.url || "/images/placeholder.jpg"} // Use a placeholder image if no image exists
                alt={product.name}
                className="w-48 h-48 object-cover rounded-full"
            />
        </div>
    );

    return (
        <div className="container mx-auto py-32 bg-gray-100">
            <Navbar />

            {/* Main Content */}
            <div className="flex flex-1 justify-center items-center w-full">
                <div className="flex flex-col xl:flex-row gap-10 xl:gap-16 justify-center px-10 sm:px-20 md:px-32 lg:px-40 xl:px-48">
                    <div className="xl:w-3/6 flex justify-center text-center xl:text-left items-center font-montserrat">
                        <div className="flex flex-col justify-center items-center xl:items-start gap-4 font-serif">
                            <p className="text-6xl font-bold text-[#D56F00]">Silog na Mabilis,</p>
                            <p className="text-2xl text-zinc-500 font-semibold">Sarap na Walang Kaparis!</p>
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

            {/* Swiper Slider with Products */}
            <div className="flex flex-row justify-center items-center font-cursive">
                <p className="font-bold text-zinc-500 text-5xl">We Serve</p>
            </div>
            <div className="px-10 sm:px-20 md:px-32 lg:px-40 xl:px-48 mt-12">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{ clickable: true }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                >
                    {products && products.map((product) => (
                        <SwiperSlide key={product._id}>
                            <div className="flex flex-col items-center">
                                <img
                                    src={product.images[0]?.url || "/images/placeholder.jpg"}
                                    alt={product.name}
                                    className="w-48 h-48 object-cover rounded-full"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
