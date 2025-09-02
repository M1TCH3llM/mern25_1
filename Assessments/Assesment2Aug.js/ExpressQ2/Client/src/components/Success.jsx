import { Component } from "react";
import SuccessChild from "./SuccessChild.jsx"
import SuccessStory from "./SuccessStory.jsx"

export default class Success extends Component {
     state = {
    name: "Jeff Jefferson",
    address: "Denver, CO"
  };

  render() {
    const { name, address } = this.state;

    return (
      <section className="card">
        <h1>“Success usually comes to those who are too busy to be looking for it.”</h1>
        <h2>“Opportunities don’t happen. You create them.”</h2>
        <h3>“It always seems impossible until it’s done.”</h3>

         <SuccessChild
          name={name}
          address={address}
          story={
            <SuccessStory
              title="The Big Win"
              text="After three failed attempts, the fourth prototype clicked. Small, focused changes compounded into a win."
              author="Not Jeff Jefferson"
            />
          }
        />
   
      </section>
      
    );
  }
}