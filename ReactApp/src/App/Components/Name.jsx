//functional component - a functional component is react is a simple function that returns JSX
import React, {useState, Fragment} from "react"; //import React library to use JSX

let NameComponent = (props) => {
    //props is an object that contains the properties passed to the component
    //props.name is the name property passed to the component

    //let [count, setCount] = useState(0); //useState is a hook that allows you to add state to functional components

    return (
        <>
            <div style={{backgroundColor: "lightGreen", padding: "5px", border: "1px solid black"}}>
                <h1>Hello, Mitchell!</h1>
                <p>This is a functional Name component.</p>
                <p>Component ID: {props.id}</p>
            </div>
            <div style={{backgroundColor: "lightYellow", padding: "5px", border: "1px solid black"}}>
                <p>This is a functional Name component.</p>
                <p>Component ID: {props.id + 1}</p>
            </div>
        </>
    );
}

export default NameComponent; //export the component to be used in other files

//hooks are used to make state change in functional components

// Fragment - a fragment is a way to group multiple elements without adding an extra node to the DOM