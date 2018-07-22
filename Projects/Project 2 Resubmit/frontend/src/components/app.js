import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

// material-ui
import { withStyles } from "@material-ui/core/styles";

// components
import ContentPostList from "./content_post_list";
import ContentPostForm from "./content_post_form";
import ContentPostDetail from "./content_post_detail";
import NoMatch from "./no_match";

// styles
import styles from "../styles";

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Switch>
          <Route
            exact
            path="/"
            component={props => <ContentPostList {...props} />}
          />
          <Route
            exact
            path="/posts/new"
            component={props => <ContentPostForm {...props} />}
          />
          <Route exact path="/404" component={NoMatch} />
          <Route
            path="/:category"
            exact
            component={props => <ContentPostList {...props} />}
          />
          <Route
            path="/:category/:post_id"
            exact
            component={props => <ContentPostDetail {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
