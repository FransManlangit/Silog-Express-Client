import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader.jsx";

const ProtectedRoute = ({ children, isAdmin = false }) => {
    const { isAuthenticated, loading, user } = useSelector(state => state.authUser);

    if (!loading) {
        if (!isAuthenticated) {
            return <Navigate to='/login' />;
        }
        if (isAdmin && (!user || user.role !== 'admin')) {
            return <Navigate to='/' />;
        }
        return children;
    }
    
    return <Loader />;
}

export default ProtectedRoute;
