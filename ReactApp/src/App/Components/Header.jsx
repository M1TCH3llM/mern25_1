import React from "react"; // this is responsible to parse the JSX code
import { NavLink, useNavigate } from "react-router-dom";

let Header = (props)=>{
    //navigate hook is used to create navigation link on the fly and send the request to given component
    const navigateHook = useNavigate();
    const navigateWithName = ()=>{
       navigateHook("/about/5000/Robin")
    }

    return(
        <>
            
            <h2>Welcome to Shopping Cart sponsored by Tech Team SIT,
                Please click on login button to proceed to login.
            </h2>
           {/* <a href="home"> Home </a>
           <a href="about"> About </a> */}
            <div>
                <NavLink to="/home"  className="button" activeclassname="true"> Home </NavLink>
                <NavLink to="/login"  className="button" activeclassname="true"> User </NavLink>               
                <NavLink to="/about"  className="button" activeclassname="true"> About </NavLink>               
            </div>

            <button onClick={navigateWithName} >About With Name</button>
        </>
    )
}

export default Header; //export the component to be used in other files