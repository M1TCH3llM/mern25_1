import React from "react";

export default class Application extends React.Component {
    constructor(parameters) {
        super(parameters);
        // Initialize state or bind methods if needed
        this.state = {};    
    }

  componentDidMount() {
    this.lizard();
  }

  lizard = () => {
    setTimeout(() => {
      const el = document.getElementById("h1");
      if (el) {
        el.innerHTML += " 🦎";
      }
      this.lizard();
    }, 1000);
  };

  render() {
    return (
      <div>
        <h1 id="h1">🦎 app.js Lizard 🦎</h1>
      </div>
    );
  }
}