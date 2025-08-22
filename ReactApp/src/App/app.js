import React, { Component, PureComponent, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./app.css";
import Header from "./Components/Header.jsx";
import Home from "./Components/Home.jsx";
import Name from "./Components/Name.jsx"
import Footer from "./Components/Footer.jsx";
import About from "./Components/About.jsx"; //complete path with .jsx extension is required
import NotFound from "./Components/NotFound.jsx";

export default class Application extends Component {
    constructor(parameters) {
        super(parameters);
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
                    <Header />
                        <Routes>
                            <Route path="/" element={<Navigate to="/home" />} />
                            <Route path="/home" element={<Home/>} />
                            <Route path="/about" element={<About />} />
                            <Route path="/about/:id/name" element={<About />} />
                             <Route path="/name" element={<Name />} />
                            <Route path="*" element={<NotFound />} />
                            {/* <HomeComponent />  
                            <About /> */}
                        </Routes>              
                    <Footer />
                </Suspense>
            </Router>
        );
    }
}

// Create a component with Your name - CommonComponents
// In that component created three div section to display information about you -(not real) with different background colors and boder extension should be .jsx
// Create a navigation link in header to navigate to your component
// Create a route in app.js to render your component