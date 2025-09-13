import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types"; // Import PropTypes for type checking
import NameComponent from "./NameComponent";

// PureComponent - it implements shouldComponentUpdate with a shallow prop and state comparison
export default class HomeComponent extends Component {
// Component - it does not implement shouldComponentUpdate, so it always returns true by default
//export default class HomeComponent extends Component {
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
            },
            counter: 0
        };   
        this.counter = 0; // Example of a class property
        this.timer = null; // To hold the interval ID for the timer

        //this.startTimer(); // Start the timer when the component is created         
        //react references - this is used to refer to the current instance of the class
        this.refName = React.createRef(); // Create a ref to access the input element
        
        //accessing the view - will not work in constructor
        // this.refName.current.value = "Hello"; // This will not work here as the component is not yet mounted
        // this.refName.current.focus(); // Set focus to the input element when the component is mounted
    }

    componentDidMount() {
        // This method is called after the component is mounted (inserted into the DOM)
        console.log("Component did mount - HomeComponent");
        // setTimeout(() => {
        //     this.refName.current.value = "Hello"; // Set initial value to the input element when the component is mounted
        //     this.refName.current.focus(); // Set focus to the input element when the component is mounted    
        // }, 2000);        
    }
    // This method is used to start a timer that updates the state every second
    startTimer = (incrementer) => {
        this.timer = setInterval(() => {
                        this.setState({timer: this.state.timer + incrementer});
                        this.counter++;
                        console.log("Counter: ", this.counter);
                    },1000);
            
            //clearInterval(this.timer); // Clear the interval to stop the timer
    }

    onTextChange = (event) => {
        // This method can be used to handle text input changes 
        console.log("Text changed: ", event.target.value);
        //console.log("Name changed: ", this.state.name);

        //this.state.name = " Himavan ";//event.target.value; // This is not the recommended way to update state in React

        //batch process manner - so that it does not cause unnecessary re-renders
        this.setState({name: event.target.value}); // This is the correct way to update state in React
        // Note: setState is asynchronous, so the state may not be updated immediately

        //console.log("Text changed in state : ", this.state.name);

        // Force a re-render of the component
        // Note: Using forceUpdate is generally not recommended as it bypasses React's state management
        //this.forceUpdate(); // Force a re-render of the component

        event.preventDefault(); // Prevent default form submission behavior if this is used in a form
    }    

    // whether it should re-render or not
    // shouldComponentUpdate(nextProps, nextState) {
    //     // This method is used to determine whether the component should re-render or not
    //     // It is called before the render method and can be used to optimize performance
    //     console.log("shouldComponentUpdate - HomeComponent");
    //     //return true; // Return true to allow re-rendering
    //     //return false; // Return false to prevent re-rendering

    //     console.log("Current State: ", this.state);
    //     console.log("Next State: ", nextState);

    //     // Example: Only re-render if the timer value has changed
    //     if (this.state.timer !== nextState.timer || this.state.name !== nextState.name 
    //                             || this.state.counter !== nextState.counter) {
    //         return true; // Allow re-rendering if timer or name has changed
    //     }
    //     return false; // Prevent re-rendering if nothing relevant has changed
    // }

    //update life cycle methods called after render
    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log("getSnapshotBeforeUpdate");
        console.log("prevState", prevState);
        console.log("prevProps", prevProps);

        //this.prevUser = prevState.user;
        // this.setState({
        //     user : this.prevUser
        // })

        return {
            prevState,
            prevProps
        }
    }

    componentDidUpdate(prevState, prevProps){
        console.log("componentDidUpdate");
        // console.log("prevState",prevState);
        // console.log("prevProps", prevProps);

        // this.setState({
        //     uState : prevState.uState
        // })
    }

    incrementCounter = () => {
        if (this.state.counter < 10) {
            this.setState({counter: this.state.counter + 1});
            
        } else {
            this.setState({counter: this.state.counter});

            // this.state.counter = 10; // Directly modifying state - not recommended
            // //this skips the shouldComponentUpdate check and forces a re-render
            // this.forceUpdate(); // Force a re-render of the component
        }

        console.log("Counter: ", this.state.counter);
    }

    // This method is used to handle form submission
    formSubmit = (event) => {
        let name = this.refName.current.value; // Access the value of the input element using the ref
        console.log("Form submitted with name: ", name);
        this.setState({name: name}); // Update the state with the input value

        event.preventDefault(); // Prevent default form submission behavior
    }

    // Lifecycle method - called when the component is about to be removed from the DOM
    // to clear any data updates or subscriptions to avoid memory leaks
    componentWillUnmount() {
        clearInterval(this.timer); // Clear the interval to stop the timer
        console.log("Component will unmount - HomeComponent");
    }


    // render method is required in class components
    // it returns the JSX to be rendered - and this is termed as the "view" in MVC architecture and virtual DOM in React
    render() {
        let val1 = 20, val2 = 10; //example of variable declaration and initialization
        //console.log("This is the Application component. Test Hot Reloading!");
        console.log("Re-render!");
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
                    <p>Counter: {this.counter} </p>
                </NameComponent> */}

                {/* controlled component - where the value of the input field is controlled by the state of the component */}
                <input type="text" placeholder="Enter your name" value={this.state.name} 
                      onChange={this.onTextChange}
                    // onChange={(e) => this.setState({name: e.target.value})}
                />
                <button  onClick={this.incrementCounter}>Increment Timer</button>
                <p>Counter: {this.state.counter} </p>

                {/* uncontrolled component - where the value of the input field is not controlled by the state of the component */}
                <form action="/user" method="post" style={{backgroundColor: "lightblue", padding: "5px", border: "1px solid black" , margin: "10px"}} >
                    <input type="text" placeholder="Enter your name - Free Flow" maxLength={25}
                            ref={this.refName} // Attach the ref to the input element
                        />
                    <input type="submit" value="Submit" onClick={this.formSubmit}/>
                </form>

                <p>Name is {this.props.userName}</p>
            </div>
        );
    }
}

HomeComponent.propTypes = {
    userName : PropTypes.string.isRequired
}

// Create a contorolled and uncontrolled components - an example
// Sharing data between parent and child components (child, properties, object, classes) - an example
// Sending data from child to parent component (using callback) - an example
// Creating navigation using button click and then sending data to the navigated component - an example
// Difference of state changes using setSttate and forceUpdate - an example