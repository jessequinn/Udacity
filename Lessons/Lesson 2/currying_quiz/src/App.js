import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

/* Write a Curried Function
 *
 * Create a function called "houseBuilder" that should:
 *   - Accept the number of stories (floors)
 *   - Return a function
 *
 * The returned function should:
 *   - Accept the color of the house
 *   - Return a string in the following format:
 *     "building a <numOfStories>-story, <color> house"
 *
 * Example:
 * const response = houseBuilder(3)('blue');
 * console.log(response); // building a 3-story, blue house
*/
function houseBuilder(numOfStories) {
  return function houseColor(color) {
    return `building a ${numOfStories}-story, ${color} house`;
  };
}

const response = houseBuilder(3)("blue");

console.log(response);



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
