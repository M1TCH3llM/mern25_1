//action -
//type - what has been performed
//payload - what is the data associated with the action
import * as actionTypes  from "../actionTypes";

export const addUserToStore = (user) => {  
    return {
        type: actionTypes.AddUserToStore,
        payload: user
    }
}

//need to make a ajax - asynchronous javascript like xml - be used to make parallel server/api calls
//React.fetch() - we can use to make API or can add axios library to achieve the same

export const SaveUserToDBUsingFetch = (userObj)=>{
    console.log("SaveUserToDBUsingFetch called")
    return (dispatch)=>{
            window.fetch("http://localhost:9000/user/api/signinup", //uri - api path
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                body : JSON.stringify(userObj)}) //JSON object can't travel from client to server so needs to be converted to string
                .then((response)=>response.json())
                .then((userData)=>{
                    console.log(userData)
                    //dispatch or send saved/signin user to reducer
                    dispatch(addUserToStore(userData))
                    //dispatch(fetchUserCart(userData._id))
                })
                .catch((error)=>console.log(error))
        }
}
