import React from "react"; // this is responsible to parse the JSX code
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

let Header = (props)=>{
    //navigate hook is used to create navigation link on the fly and send the request to given component
    const navigateHook = useNavigate();
    const navigateWithName = ()=>{
       navigateHook("/about/5000/Robin")
    }

    let userName = props.user && props.user.userName ? props.user.userName : "Guest"

    return(
        <>
            {userName=="Guest" ? <h3>
            Welcome to Shopping Cart sponsored by Tech Team SIT,
                Please click on login button to proceed to login.
            </h3> : <h3>
                Welcome to Shopping Cart sponsored by Tech Team SIT, {userName}                
            </h3> }
           {/* <a href="home"> Home </a>
           <a href="about"> About </a> */}
            <div>
                <NavLink to="/home"  className="button" activeclassname="true"> Home </NavLink>
                <NavLink to="/login"  className="button" activeclassname="true"> User </NavLink>               
                <NavLink to="/about"  className="button" activeclassname="true"> About </NavLink>
                <NavLink to="/student"  className="button" activeclassname="true"> Student </NavLink> 
                <NavLink to="/product"  className="button" activeclassname="true"> Product </NavLink> 

            </div>

            <button onClick={navigateWithName} >About With Name</button>
        </>
    )
}

// subscribe to store and get the state as props
let mapStateToProps = (store)=>{
    return{
        user : store.userState.user //this is accessing user data from user reducer and will be used in component as props
    }
}

export default connect(mapStateToProps, null)(Header); //export the component to be used in other files

// Subscriber - this component reads data from store
// Publisher - this component writes data to store
// connect() - this is a function which connects react component to redux store
// connect(mapStateToProps, mapDispatchToProps)(ComponentName)
// mapStateToProps - this is used to read the data from store and pass it as props
// mapDispatchToProps - this is used to write the data to store and pass the dispatcher functions as props