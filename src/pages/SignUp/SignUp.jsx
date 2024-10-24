import React, { useEffect, useState } from "react";
import { Button, Modal, Checkbox, Input, Form } from "antd"; // Importing Ant Design components
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Register, clearErrors } from '../../actions/userActions';
import { REGISTER_USER_RESET } from '../../constants/userConstants';
import { toast } from 'react-toastify';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, success, loading, message } = useSelector((state) => state.authUser || {});
    const [showModal1, setShowModal1] = useState(false); // Modal visibility state
    const [isChecked, setIsChecked] = useState(false); // Checkbox state for terms and conditions
    const [formValues, setFormValues] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSuccess = (message = '') => {
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    };

    const handleError = (error = '') => {
        toast.error(error, {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    };

    useEffect(() => {
        if (error) {
            handleError(error);
            dispatch(clearErrors());
        }
        if (success) {
            handleSuccess(message);
            setTimeout(() => {
                navigate("/", { replace: true });
                dispatch({ type: REGISTER_USER_RESET });
            }, 5000);
        }
    }, [dispatch, error, success, message]);

    const onSubmit = (values) => {
        if (!isChecked) {
            handleError("Please accept the Terms and Conditions.");
            return;
        }
        if (values.password !== values.confirmPassword) {
            handleError("Passwords do not match!");
            return;
        }

        const formData = new FormData();
        formData.set('firstname', values.firstname);
        formData.set('lastname', values.lastname);
        formData.set('phone', "+63" + values.phone);
        formData.set('email', values.email);
        formData.set('password', values.password);
        dispatch(Register(formData));
    };

    const toggleModal1 = () => {
        setShowModal1(!showModal1);
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleInputChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    return (

        <div className="flex h-screen">
            {/* Left Side - Welcome Section */}
            <div className="w-1/2 bg-[#D56F00] flex flex-col justify-center items-center p-10">
                <h1 className="text-4xl font-bold text-white">Welcome Back!</h1>
                <p className="text-white mt-4">
                    To keep connected with us, please login with your personal info.
                </p>
                <Button className="mt-6 bg-white text-green-500 px-6 py-3 rounded-full font-semibold">
                    SIGN IN
                </Button>

            </div>

            {/* Right Side - Create Account Section */}
            <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10">
                <Form className="space-y-8 min-w-[30rem]" onFinish={onSubmit}>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-6xl font-extrabold text-[#D56F00]">
                            <span className="font-cursive text-8xl">S</span>
                            <span className="text-5xl font-georgia">ilog Xpress</span>
                        </p>

                        {/* <span className="text-center">
        “A Billionaire Cooperative that is member responsive and socially responsible.”
    </span> */}
                    </div>


                    <div className="space-y-10">
                        <div className="grid grid-cols-2 grid-rows-1 gap-4">
                            <div className="space-y-1">
                                <p className="text-lg font-poppins">First Name <span className="text-red-500">*</span></p>
                                <Form.Item
                                    name="firstname"
                                    rules={[{ required: true, message: "First name is required" }]}
                                >
                                    <Input
                                        size="large"
                                        name="firstname"
                                        value={formValues.firstname}
                                        onChange={handleInputChange}
                                    />
                                </Form.Item>
                            </div>
                            <div className="space-y-1">
                                <p className="text-lg font-poppins">Last Name <span className="text-red-500">*</span></p>
                                <Form.Item
                                    name="lastname"
                                    rules={[{ required: true, message: "Last name is required" }]}
                                >
                                    <Input
                                        size="large"
                                        name="lastname"
                                        value={formValues.lastname}
                                        onChange={handleInputChange}
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-lg font-poppins">Mobile Number <span className="text-red-500">*</span></p>
                            <Form.Item
                                name="phone"
                                rules={[{ required: true, message: "Mobile number is required" }]}
                            >
                                <Input
                                    size="large"
                                    name="phone"
                                    value={formValues.phone}
                                    onChange={handleInputChange}
                                />
                            </Form.Item>
                        </div>

                        <div className="space-y-1">
                            <p className="text-lg font-poppins">Email <span className="text-red-500">*</span></p>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: "Email is required" }]}
                            >
                                <Input
                                    size="large"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                />
                            </Form.Item>
                        </div>

                        <div className="space-y-1">
                            <p className="text-lg font-poppins">Password <span className="text-red-500">*</span></p>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: "Password is required" }]}
                            >
                                <Input.Password
                                    size="large"
                                    name="password"
                                    value={formValues.password}
                                    onChange={handleInputChange}
                                />
                            </Form.Item>
                        </div>

                        <div className="space-y-1">
                            <p className="text-lg font-poppins">Confirm Password <span className="text-red-500">*</span></p>
                            <Form.Item
                                name="confirmPassword"
                                rules={[{ required: true, message: "Confirm password is required" }]}
                            >
                                <Input.Password
                                    size="large"
                                    name="confirmPassword"
                                    value={formValues.confirmPassword}
                                    onChange={handleInputChange}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    {/* Terms & Conditions Modal and Checkbox */}
                    <div className="flex flex-col space-y-2">
                        <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
                            I accept the <span className="text-[#1E4BCA]" onClick={toggleModal1} style={{ cursor: "pointer" }}>Terms and Conditions</span>
                        </Checkbox>

                        {/* Ant Design Modal for Terms and Conditions */}
                        <Modal
                            title="Terms & Conditions"
                            visible={showModal1}
                            onCancel={toggleModal1}
                            footer={[
                                <Button key="accept" type="primary" onClick={() => {
                                    setIsChecked(true);
                                    toggleModal1();
                                }}>
                                    Accept
                                </Button>
                            ]}
                        >
                            <p className="text-lg font-poppins">Your terms and conditions go here...</p>
                        </Modal>
                    </div>

                    <div className="flex flex-col gap-2">
                        <button className="bg-[#D56F00] text-white text-lg font-poppins font-semibold font-montserrat px-12 py-2 rounded-full transition-colors duration-300 hover:bg-[#585666] active:bg-[#3e3d41]">
                            Create Account
                        </button>

                        <p className="text-sm">
                            Have an account?{" "}
                            <a className="text-[#1E4BCA]" href="/login">
                                Login
                            </a>
                        </p>
                    </div>
                </Form>
            </div>
        </div>

    );
};

export default SignUp;
