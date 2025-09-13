//This component will work as a sign-up page for the application but it has to be a functional component
// Functional component don't have state object like class component and callback method as setState API
// From react 16.4 we have hooks present which export some features that are defined in component classes
// like - creating and updating a state (useState)
// creating and updating the ref element (useRef)

import React, { useState, useRef } from "react";
//import { connect } from "react-redux"; //helps to connect react component with redux store

import { addUserToStore, SaveUserToDBUsingFetch } from "../../State/User/UserAction";
import { useDispatch, useSelector } from "react-redux";

let UserComponent = (props)=>{

    // the class component inherits from Component base class from react and has implementation for state and 
    // its API's setState and forceUpdate
    // constructor(){
    //     this.state = {}
    // }
    //this.state.userName = "new name"
    console.log("Useromponent")
    //this allows us to access the state from store as we do with mapStateToProps

    //its the alternative to connect and mapStateToProps
    let user = useSelector(store=>store.userState.user)
    
    //useState - hook implements an object to create the state and a callback to udpate the state
    let [userName, updateUserName] = useState(user.userName)
    let [password, updateUserPassword] = useState(user.password)
    let [street, updateUserAddress] = useState(user.street)
    let [mobile, updateUserMobile] = useState(user.mobile)

    //action creator - is the function which creates an action object and sends to dispatcher
    let dispatcher = useDispatch() //this is the alternative to connect and mapDispatchToProps

    let textBoxOnChange = (evt)=>{
        //using the state updater to update the userName state
        updateUserName(evt.target.value) //works same way as setState to call react renderer
    }

    let saveUserClick = (evt)=>{
        // let user = {
        //     userName, street
        // } 
        //this is the call to dispatcher using action creater
        // props.addUser({
        //     userName,
        //     password, 
        //     street, 
        //     mobile
        // })

        // dispatcher(
        //     addUserToStore({ //action to be passed to dispatcher
        //         userName,
        //         password, 
        //         street, 
        //         mobile
        // }))

        dispatcher(
            SaveUserToDBUsingFetch({ //action to be passed to dispatcher
                userName,
                password, 
                street, 
                mobile
        }))

        alert("User saved successfully in store")

        //alert("User send to signin via reducer")

        evt.preventDefault();
    }

    return(
        <>
            <h1>User SignIn - SignUp Page</h1>
            <div className="form col-md-12">
                     <div className="form-control">
                         <div className="col-md-3">
                             <b>User Name</b>
                         </div>
                         <div className="col-md-7">
                             <input type="text" className="form-control textbox userName" value={userName}
                                 placeholder="Please provide user name" maxLength={20} onChange={textBoxOnChange}></input>
                         </div>
                     </div>
                     <div className="form-control">
                         <div className="col-md-3">
                             <b>User Password</b>
                         </div>
                         <div className="col-md-7">
                             <input type="password" className="form-control textbox" value={password}
                                 placeholder="Please provide password" maxLength={30} 
                                    onChange={(evt)=>updateUserPassword(evt.target.value)}></input>
                         </div>
                     </div>
                     <div className="form-control">
                         <div className="col-md-3">
                             <b>User Address</b>
                         </div>
                         <div className="col-md-7">
                             <input type="text" className="form-control textbox" value={street}
                                 placeholder="Please provide address" maxLength={30} 
                                    onChange={(evt)=>updateUserAddress(evt.target.value)}></input>
                         </div>
                     </div>
                     <div className="form-control">
                         <div className="col-md-3">
                             <b>User Mobile</b>
                         </div>
                         <div className="col-md-7">
                             <input type="number" className="form-control textbox" value={mobile}
                                 placeholder="Please provide user mobile" 
                                    onChange={(evt)=>updateUserMobile(evt.target.value)}></input>
                         </div>
                     </div>
                     <div className="form-control">
                         <div className="col-md-7 button">
                             <input type="submit" className="button" onClick={saveUserClick} value={"Save User"}></input>
                         </div>
                     </div>
                </div>
        </>
    )
}

//export default UserComponent;

// //subscribing from store - mapStateToProps - allows to access the store data in react component as props
let mapStateToProps = (store)=>{
    return{
        user : store.userState.user //this is accessing user data from user reducer and will be used in component as props
    }
}

// //publishing to store
let mapDispatchToProps = (dispatch)=>{
    return {
        addUser : (userData)=>{
            dispatch(addUserToStore(userData))//dispatcher works as a pipline to take the action to store
        }
    }
};

//export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
export default UserComponent;