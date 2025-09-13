import React, { Component, PureComponent, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./app.css";
//import "./style.css";
import HeaderComponent from "./CommonComponents/HeaderComponent";
import HomeComponent from "./CommonComponents/HomeComponent";
import FooterComponent from "./CommonComponents/FooterComponent";
import About from "./CommonComponents/AboutComponent.jsx"; //complete path with .jsx extension is required
import NotFoundComponent from "./CommonComponents/NotFoundComponent";
import UserComponent from "./AppComponents/User/UserComponent";
import StudentComponent from "./AppComponents/Student/StudentComponent.js";

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
                            <Route path="/student" element={<StudentComponent />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/about/:id/:name" element={<About />} /> 
                            <Route path="*" element={<NotFoundComponent />} />
                            {/* <HomeComponent />  
                            <About /> */}
                        </Routes>              
                    <FooterComponent />
                </Suspense>
            </Router>
        );
    }
}

// Create a component with Your name - CommonComponents
// In that component created three div section to display information about you -(not real) with different background colors and boder extension should be .jsx
// Create a navigation link in header to navigate to your component
// Create a route in app.js to render your component