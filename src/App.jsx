import React from "react";
import { Routes, Route } from "react-router-dom";// Import BrowserRouter
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./App.css";

import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";

import SignUp from "./pages/SignUp/SignUp";
import SuccessVerify from "./pages/VerifyEmail/VerifyEmail";

import Products from "./pages/Product/Product";



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} exact="true" />
        <Route path='/verify/email/:token/:id' element={<SuccessVerify />} exact='true' />
        <Route path='/signup' element={<SignUp />} exact='true' />
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
