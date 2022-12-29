import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Navbar from './Navbar';
import Product from "./Product"
import Cart from "./Cart"
import AdminProduct from "./Product/DetailProduct"
import Login from "./auth/Login"
import Register from "./auth/Register"


function Main() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/product" element={<Product />} />
                    <Route exact path="/cart" element={<Cart />} />
                    <Route exact path="/adminproduct" element={<AdminProduct />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                </Routes>
            </Router>
        </div>
    )
}

export default Main