// code modified from https://stackoverflow.com/questions/47003455/validating-url-parameters-in-react-router-v4
import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

class PrivateRoute extends Component {
  state = {
    validated: true
  };

  async componentDidMount() {
    if (this.props.validator) {
      this.setState({
        validated: await this.props.validator(
          this.props.computedMatch.params.category
        )
      });
    }
  }

  render() {
    if (!this.state.validated) {
      return (
        <Redirect
          to={{
            pathname: this.props.redirect,
            state: { from: this.props.location }
          }}
        />
      );
    }

    return <Route {...this.props} />;
  }
}

export default PrivateRoute;
