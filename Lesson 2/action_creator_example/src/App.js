import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

/* Create An Action Creator
 *
 * You need to create an action creator called 'mealCreator' that should:
 *   - Accept an id
 *   - Return a Redux action with a 'type' property that has a value of 'CREATE_MEAL'
 *   - Include the id passed to the action creator
*/
const CREATE_MEAL = "CREATE_MEAL";

const mealCreator = id => ({
  type: CREATE_MEAL,
  id
});


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
