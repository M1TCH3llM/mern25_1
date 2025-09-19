import * as actionTypes  from "../actionTypes";

let initialState = {
    user : {
        userName : "User Temp Reducer!!",
        password : "",
        street : "",
        mobile : ""
    }
}

//reducer accepts state and action in its params
//action - is an object which contains two things
// type - the type of action is needed
// payload - the data object to be updated once type is matched
let userReducer = (state = initialState, action) => {
    console.log("User Reduer ", action)

    switch (action.type) {
        case actionTypes.AddUserToStore:
            //...state - spread operator to copy the existing state object
            // product, user, cart => user : action.payload
            return {...state, user: action.payload}
    
        default:
            return state
    }

}

export default userReducer;