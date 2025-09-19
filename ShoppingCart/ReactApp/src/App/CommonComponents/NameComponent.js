//functional component - a functional component is react is a simple function that returns JSX
import React, {useState, Fragment} from "react"; //import React library to use JSX

let NameComponent = (props) => {
    //props is an object that contains the properties passed to the component
    //props.name is the name property passed to the component

    //let [count, setCount] = useState(0); //useState is a hook that allows you to add state to functional components

    //props.children - is used to access the children passed to the component
    //props.id - is used to access the id property passed to the component
    //props.address - is used to access the address property passed to the component

    return (
        <>
            <div style={{backgroundColor: "lightGreen", padding: "5px", border: "1px solid black"}}>
                <h1>Hello, {props.name}!</h1>
                <p>This is a functional Name component.</p>
                <p>Component ID: {props.id}</p>
            </div>
            <div style={{backgroundColor: "lightYellow", padding: "5px", border: "1px solid black"}}>
                <p>This is a functional Name component.</p>
                <p>Component ID: {props.id + 1}</p>
            </div>
            <label className="classSelector">Test Class Selector Style</label>

            <label id="myCss" className="classSelector class2Selector" >Test ID Selector Style</label>

            <p>{props.address.firstLine}</p>
            <p>{props.address.secondLine}</p>
            <p>{props.address.city}</p>
            <p>{props.address.state}</p>

            {props.children /* This will render the children passed to the component */}

            {props.children && props.children[0]} {/* This will render the first child passed to the component, if any */}

            {/* Button to start the timer */}
            {/* <button onClick={props.startTimer}>Start Timer</button> */}

            <button onClick={() => props.startTimer(5)}>Start Timer</button>
        </>
    );
}

export default NameComponent; //export the component to be used in other files

//hooks are used to make state change in functional components

// Fragment - a fragment is a way to group multiple elements without adding an extra node to the DOM

//we should use default props to assign default values to the properties that we use in our component
NameComponent.defaultProps = {
    address : {
        firstLine: "123 Default St",
        secondLine: "Default City",
        city: "Default City",
        state: "DC"
    }
}