import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

/* Create A Reducer
 *
 * You need to create a reducer called "appReducer" that accepts two arguments:
 * - First, an array containing information about ice cream
 * - Second, an object with a 'DELETE_FLAVOR' `type` key
 * (i.e., the object contains information to delete the flavor from the state)
 *
 * The action your reducer will receive will look like this:
 * { type: 'DELETE_FLAVOR', flavor: 'Vanilla' }
 *
 * And the initial state will look something like this (as such, refrain
 * from passing in default values for any parameters!):
 * [{ flavor: 'Chocolate', count: 36 }, { flavor: 'Vanilla', count: 210 }];
*/

const appReducer = (state, action) => {
  switch (action.type) {
    case "DELETE_FLAVOR":
      return state.filter(obj => obj.flavor !== action.flavor);
    default:
      return state;
  }
};

const result = appReducer(
  [{ flavor: "Chocolate", count: 36 }, { flavor: "Vanilla", count: 210 }],
  { type: "DELETE_FLAVOR", flavor: "Vanilla" }
);

console.log(result);


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
