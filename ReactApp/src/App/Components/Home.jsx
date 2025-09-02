import React, { Component, PureComponent } from "react";
import NameComponent from "./NameComponent";

export default class HomeComponent extends Component {
    constructor(parameters) {
        super(parameters);
        // Initialize state or bind methods if needed
        this.state = {
            timer: 0,
            name : "Synergistic IT",
            address : {
                firstLine : "21",
                secondLine : "Main Street",
                city : "New York",
                state : "NY"
            }
        };   
        this.counter = 0; // Example of a class property
        //this.startTimer(); // Start the timer when the component is created 

        //react references - this is used to refer to the current instance of the class
        this.refName = React.createRef(); // Create a ref to access the input element
         this.refCity = React.createRef();
    }

    // This method is used to start a timer that updates the state every second
    startTimer = (incrementer) => {
        setInterval(() => {
            this.setState({timer: this.state.timer + incrementer});
            this.counter++;
            console.log("Counter: ", this.counter);
        },1000)
    }

    onTextChange = (event) => {
        // This method can be used to handle text input changes 
        console.log("Text changed: ", event.target.value);

        //this.state.name = event.target.value; // This is not the recommended way to update state in React
        //batch process manner - so that it does not cause unnecessary re-renders
        this.setState({name: event.target.value}); // This is the correct way to update state in React
        // Note: setState is asynchronous, so the state may not be updated immediately

        //console.log("Text changed in state : ", this.state.name);

        // Force a re-render of the component
        // Note: Using forceUpdate is generally not recommended as it bypasses React's state management
        // this.forceUpdate(); // Force a re-render of the component

        event.preventDefault(); // Prevent default form submission behavior if this is used in a form
    }    

    // This method is used to handle form submission
    formSubmitName = (event) => {
        let name = this.refName.current.value; // Access the value of the input element using the ref
        console.log("Form submitted with name: ", name);
        this.setState({name: name}); // Update the state with the input value

        event.preventDefault(); // Prevent default form submission behavior
    }

    formSubmitCity = (event) => {
        let city = this.refCity.current.value; // Access the value of the input element using the ref
        console.log("Form submitted with city: ", city);
        this.setState({city: city}); // Update the state with the input value

        event.preventDefault(); // Prevent default form submission behavior
    }

    // render method is required in class components
    // it returns the JSX to be rendered - and this is termed as the "view" in MVC architecture and virtual DOM in React
    render() {
        let val1 = 20, val2 = 10; //example of variable declaration and initialization
        // console.log("This is the Application component. Test Hot Reloading!");
        return (
            <div style={{padding: "5px", border: "1px solid red"}}> 
                {/* <div style={{backgroundColor: "lightblue", padding: "5px", border: "1px solid black"}}>
                    <h1>Hello, World!</h1>
                    <h4> Sum : {(val1 + val2)}</h4>
                    <h4> Multiplication : {(val1 * val2)}</h4>
                    <h4> Substraction : {(val1 - val2)}</h4>
                    <h4> Timer : {(this.state.timer)}</h4>
                    <p>This is a simple React component.</p>
                    <h4> Counter : {(this.counter)}</h4>
                </div>
                
                <NameComponent name="Synergistic IT" id={this.state.timer} address={this.state.address} 
                                        startTimer={this.startTimer}>
                    <p>This is a child component.</p>
                    <p>Counter: {this.counter} </
                    
                    p>
                </NameComponent> */}
                <input type="text" placeholder="Enter your city" value={this.state.city} 
                      onChange={this.onTextChange}
                    // onChange={(e) => this.setState({name: e.target.value})}
                />

                {/* controlled component - where the value of the input field is controlled by the state of the component */}
                <input type="text" placeholder="Enter your name" value={this.state.name} 
                      onChange={this.onTextChange}
                    // onChange={(e) => this.setState({name: e.target.value})}
                />
                 <form onSubmit={this.formSubmitCity} action="/user" method="post" style={{backgroundColor: "lightblue", padding: "5px", border: "1px solid black" , margin: "10px"}} >
                    <input type="text" placeholder="Enter your city - Free Flow" maxLength={25}
                            ref={this.refCity} // Attach the ref to the input element
                        />
                    <input type="submit" value="Submit" onClick={this.formSubmit}/>
                </form>

                {/* uncontrolled component - where the value of the input field is not controlled by the state of the component */}
                <form onSubmit={this.formSubmitName} action="/user" method="post" style={{backgroundColor: "lightblue", padding: "5px", border: "1px solid black" , margin: "10px"}} >
                    <input type="text" placeholder="Enter your name - Free Flow" maxLength={25}
                            ref={this.refName} // Attach the ref to the input element
                        />
                    <input type="submit" value="Submit" onClick={this.formSubmit}/>
                </form>
            </div>
        );
    }
}

// Create a contorolled and uncontrolled components - an example
// Sharing data between parent and child components (child, properties, object, classes) - an example
// Sending data from child to parent component (using callback) - an example
// Creating navigation using button click and then sending data to the navigated component - an example
// Difference of state changes using setState and forceUpdate - an example
