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
import ReviewComponent from "./AppComponents/Review/ReviewComponent.js";
import NotificationMount from "./CommonComponents/NotificationMount.js"

export default class Application extends Component {
    constructor(parameters){
    
        super();
        this.state = {timer: 0};   
    }

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
                            <Route path="/resentOrders" element={<RecentOrders />} />
                            <Route path="/coupon" element={<CouponComponent />} />
                            <Route path="/review" element={<ReviewComponent />}  />                          {/* <HomeComponent />  
                            <About /> */}
                        </Routes>              
                    <FooterComponent />
                </Suspense>
            </Router>
        );
    }
}

