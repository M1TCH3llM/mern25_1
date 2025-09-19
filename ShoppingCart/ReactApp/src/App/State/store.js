//store will be working as a container to hold initial states and logic to update the reducers
//store objects come from redux library
//combineReducers - is a hook used to combine multiple reducers as a single entity as redux will allow only one reducers per application
//getDefaultMiddleware - is a hook used to pass or inject some additional features like logger etc.in the execution cycle
//configureStore - is a hook used to pass intial state and the reducers 
//reducer - is a function which works with switch case (for each action type) and updates the state
// for every change returns new state
//each component will have its respective reducer 
//action - is the object a reducer accepts to create a new state
//action - object => action type (increment) ,payload (+5)


//store will be working as a container to hold initial states and logic to update the reducers
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./User/UserReducer";
import studentReducer from "./Student/StudentReducer";
import productReducer from "./Product/ProductReducer";
import cartReducer from "./Cart/CartReducer";

function logger({ getState }) {
  return next => action => {
    console.log('will dispatch', action)
    const returnValue = next(action)
    console.log('state after dispatch', getState())
    return returnValue
  }
}

const cartPersistence = storeAPI => next => action => {
  const result = next(action);
  try {
    const { cartState } = storeAPI.getState();
    localStorage.setItem("cart_v1", JSON.stringify({ items: cartState.items || [] }));
  } catch {}
  return result;
};

let rootReducer = combineReducers({
  userState: userReducer,
  studentState: studentReducer, 
  productState: productReducer,
  cartState: cartReducer,
});

let store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, cartPersistence),
});

export default store;

// Redux - the data management library for front-end applications (not just react)
// Reducers <callback functions - with switch case using action <type and payload>>
// Actions  <action object consists of <type and payload>>
// ActionCreator <can be understood as the event handler call from the front end>
// Dispatcher <creates a pipeline of multiple actions and takes them to store/reducer>
// Store <collection of reducers/states and acts as parent of all react app components so that states can be accessed via props>