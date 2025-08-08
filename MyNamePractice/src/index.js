console.log("This is the index.js file for the React application. Test Hot Reloading!");
//alert("Welcome to the React Application! From Index.js");
import React from "react";
import * as ReactDOM from "react-dom/client"
import Application from "./App/app.js"; //import the Application component

const root = ReactDOM.createRoot(document.getElementById("root")); //create a root element for the React application

//bootstrap the React application
//this will render the Application component inside the root element
root.render(
    <Application /> //render the Application component inside the root element
);