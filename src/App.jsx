import React from "react";
import { Routes, Route } from "react-router-dom";// Import BrowserRouter
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";

import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import SuccessVerify from "./pages/VerifyEmail/VerifyEmail";

import Products from "./pages/Product/Product";



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} exact="true" />
        <Route path='/verify/email/:token/:id' element={<SuccessVerify />} exact='true' />
        <Route path='/signup' element={<SignUp />} exact='true' />
        <Route path='/login' element={<Login />} exact='true' />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} exact='true' />
        <Route
          path="/products"
          element={
            <Products/>
          }
        />
      
      </Routes>
    </div>
  );
}

export default App;
