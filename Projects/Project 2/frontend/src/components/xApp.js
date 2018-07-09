import React, { Component } from "react";
import { Route, Switch } from "react-router";
import root from "./root";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" component={root} />
        </Switch>
      </div>
    );
  }
}

export default App;
