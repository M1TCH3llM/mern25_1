console.log("This is the index.js file for the React application. Test Hot Reloading!");
//alert("Welcome to the React Application! From Index.js");
import React from "react";
import * as ReactDOM from "react-dom/client"
import store from "./App/State/store.js";
import Application from "./App/app.js"; //import the Application component
import { Provider } from "react-redux";


const root = ReactDOM.createRoot(document.getElementById("root")); //create a root element for the React application

//bootstrap the React application
//this will render the Application component inside the root element
// at this point very first time react-dom creates the virtual DOM
root.render(
    <Provider store={store}>
        <Application /> 
    </Provider>
);