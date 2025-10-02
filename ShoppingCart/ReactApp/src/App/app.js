import React, { Component, PureComponent, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./app.css";
//import "./style.css";
import HeaderComponent from "./CommonComponents/HeaderComponent.js";
import HomeComponent from "./CommonComponents/HomeComponent.js";
import FooterComponent from "./CommonComponents/FooterComponent.js";
import About from "./CommonComponents/AboutComponent.jsx"; //complete path with .jsx extension is required
import NotFoundComponent from "./CommonComponents/NotFoundComponent.js";
import UserComponent from "./AppComponents/User/UserComponent.js";
import StudentComponent from "./AppComponents/Student/StudentComponent.js";
import ProductComponent from "./AppComponents/Product/ProductComponent.js";
import CartComponent from "./AppComponents/Cart/CartComponent.js";
import CheckoutPage from "./AppComponents/Checkout/CheckoutPage.js";
import CouponComponent from "./AppComponents/CouponPage/CouponPage.js";
import RecentOrders from "./AppComponents/Orders/RecentOrders.js";


export default class Application extends Component {
    constructor(parameters){
    
        super();
        // Initialize state or bind methods if needed
        this.state = {timer: 0};   
        //this.startTimer(); // Start the timer when the component is created 
    }

    // render method is required in class components
    // it returns the JSX to be rendered - and this is termed as the "view" in MVC architecture and virtual DOM in React
    render() {
        return (
            <Router>                
                <Suspense fallback={<div>Loading...</div>}>
                    <HeaderComponent />
                        <Routes>
                            <Route path="/" element={<Navigate to="/home" />} />
                            <Route path="/home" element={<HomeComponent />} />
                            <Route path="/login" element={<UserComponent />} />
                            {/* <Route path="/student" element={<StudentComponent />} /> */}
                            <Route path="/about" element={<About />} />
                            <Route path="/about/:id/:name" element={<About />} /> 
                            <Route path="*" element={<NotFoundComponent />} />
                            <Route path="/product" element={<ProductComponent />} />
                            <Route path="/cart" element={<CartComponent />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/coupon" element={<CouponComponent />} />
                            <Route path="/resentOrders" element={<RecentOrders />} />
                            {/* <HomeComponent />  
                            <About /> */}
                        </Routes>              
                    <FooterComponent />
                </Suspense>
            </Router>
        );
    }
}


// 17-Sept-2025 - Cart Implementation
// Cart Implementation
// Create New Cart Component using react hooks, functional component
// Each Item in this component should be added from Product Component 
// Now each Product should have general fields, like Name, Description, Rating, Price, Category (New Product Document/ Collection)
// In Product component each item when we click to display details should also have a button "Add To Item" on click should add to New Cart
// On Cart Component, Button for save to Checkout should save the cart item to database (New Cart Document/ Collection)
