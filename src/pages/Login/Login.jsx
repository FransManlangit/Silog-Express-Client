import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Form } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginUsers, clearErrors } from '../../actions/userActions';
import { toast } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader.jsx'; 


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const { isAuthenticated, error, loading } = useSelector((state) => state.authUser);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const redirect = location.search ? location.search.split("=")[1] : "";

    const handleSuccess = (message = '') => {
        toast.success(message, {
            position: 'bottom-center',
        });
    };

    const handleError = (error = '') => {
        toast.error(error, {
            position: 'bottom-center',
        });
    };

    useEffect(() => {
        if (isAuthenticated) {
            handleSuccess("Login Successful");
            if (redirect) {
                navigate(`/${redirect}`, { replace: true });
            } else {
                navigate("/");
            }
        }
        if (error) {
            handleError(error);
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, error, navigate, redirect]);

    const onSubmit = () => {
        dispatch(LoginUsers(email, password));
    };

    return (
        <div className="flex h-screen">
            {/* Show loader if loading is true */}
            {loading ? (
                <Loader />
            ) : (
                <>
                    {/* Left Side - Welcome Section */}
                    <div className="w-1/2 bg-[#D56F00] flex flex-col justify-center items-center p-10 space-y-8">
                        <img 
                            src="/images/Login.avif" 
                            alt="Welcome Image" 
                            className="w-64 h-64 object-cover rounded-3xl" 
                        />
                        <h1 className="text-5xl font-bold text-white">Welcome Back!</h1>
                        <p className="text-lg text-white text-center max-w-md">
                            To keep connected with us, please sign in with your personal info.
                        </p>
                        <button 
                            className="mt-6 bg-white text-[#D56F00] px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300 shadow-md"
                            onClick={() => navigate("/signup")}
                        >
                            Create Account
                        </button>
                    </div>
                    
                    {/* Right Side - Login Section */}
                    <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10">
                        <Form className="space-y-10 min-w-[30rem] bg-gray-50 p-8 shadow-lg rounded-lg" onFinish={onSubmit}>
                            {/* Title with styled "S" */}
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-6xl font-extrabold text-[#D56F00]">
                                    <span className="font-cursive text-8xl">S</span>
                                    <span className="text-5xl font-georgia">ilog Xpress</span>
                                </p>
                            </div>

                            {/* Input Fields */}
                            <div className="space-y-8">
                                <div className="space-y-1">
                                    <p className="text-lg font-poppins">Email <span className="text-red-500">*</span></p>
                                    <Form.Item name="email" rules={[{ required: true, message: "Email is required" }]}>
                                        <Input
                                            size="large"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="border rounded-lg px-4 py-2 focus:border-[#D56F00] focus:ring-2 focus:ring-[#D56F00]"
                                        />
                                    </Form.Item>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-lg font-poppins">Password <span className="text-red-500">*</span></p>
                                    <Form.Item name="password" rules={[{ required: true, message: "Password is required" }]}>
                                        <Input.Password
                                            size="large"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="border rounded-lg px-4 py-2 focus:border-[#D56F00] focus:ring-2 focus:ring-[#D56F00]"
                                        />
                                    </Form.Item>
                                </div>
                            </div>

                            {/* Login Button */}
                            <div className="flex flex-col gap-2">
                                <button 
                                    className="bg-[#D56F00] text-white text-lg font-poppins font-semibold px-12 py-2 rounded-full transition-colors duration-300 hover:bg-[#585666] active:bg-[#3e3d41]"
                                    htmlType="submit"
                                >
                                    Login
                                </button>

                                {/* <p className="text-sm">
                                    Don't have an account?{" "}
                                    <a className="text-[#1E4BCA]" href="/signup">
                                        Create Account
                                    </a>
                                </p> */}
                            </div>
                        </Form>
                    </div>
                </>
            )}
        </div>
    );
};

export default Login;
