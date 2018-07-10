import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { fetchCategories, fetchPosts } from "../actions";

// import Header from './header';
import Main from "./main";
import Sidebar from "./sidebar";
// import Footer from './footer';
const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={2}>
            {" "}
          </Grid>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={6}>
            <Main />
          </Grid>
          <Grid item xs={2}>
            {" "}
          </Grid>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(
  connect(
    undefined,
    { fetchCategories, fetchPosts }
  )(withStyles(styles)(App))
);
