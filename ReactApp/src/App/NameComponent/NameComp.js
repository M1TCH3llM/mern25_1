//functional component - a functional component is react is a simple function that returns JSX
import React from "react"; //import React library to use JSX

let NameComp = (props) => {
    //props is an object that contains the properties passed to the component
    //props.name is the name property passed to the component
    
    
    return (
        <div>
            <h1>Hello, {props.name}!</h1>
            <p>This is a functional Name component.</p>
            <h3>Timer {props.timer}</h3>
        </div>
    );
}

export default NameComp; //export the component to be used in other files