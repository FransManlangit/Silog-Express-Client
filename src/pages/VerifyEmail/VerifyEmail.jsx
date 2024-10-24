import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "primereact/button";  
import { verifyUserEmail } from "../../actions/userActions";

        

const SuccessVerify = () => {
    const dispatch = useDispatch();
    let { id, token } = useParams();

    useEffect(() => {
        dispatch(verifyUserEmail(token, id));
    }, [dispatch, id, token]);

    return (
        <div className="bg-zinc-100 min-h-screen flex justify-center items-center">
            <div className="bg-white p-4 justify-center flex flex-col items-center rounded-xl space-y-5 mb-20">
                {/* Replacing Chakra's Icon with PrimeReact CheckIcon */}
                <i className="pi pi-check" style={{ fontSize: "160px", color: "orange" }} />

                <h2 className="text-lg mt-4">Email Verification</h2>

                <p className="text-zinc-500">
                    Your email has been verified successfully!
                </p>

                <Link to="/login">
                    {/* PrimeReact's Button component */}
                    <Button label="Login" className="p-button-lg p-button-danger" />
                </Link>
            </div>
        </div>
    );
};

export default SuccessVerify;
