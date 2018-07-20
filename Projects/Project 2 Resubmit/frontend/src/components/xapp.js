// Site structure based on example found here (https://material-ui.com/demos/drawers/)
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

// material-ui (https://material-ui.com/)
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Grid from "@material-ui/core/Grid";

// components
import SideBar from "./side_bar.js";
import ContentPostList from "./content_post_list";
import ContentPostForm from "./content_post_form";
import ContentPostDetail from "./content_post_detail";

import styles from "../styles";

// call actions
import { getCategories } from "../actions";

class App extends Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.hide
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Readable App - Jesse Quinn
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <SideBar />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container spacing={24}>
            <Grid item xs={12}>
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
                <Route
                  path="/:category"
                  exact
                  component={props => <ContentPostList {...props} />}
                />
                <Route
                  path="/:category/:id"
                  exact
                  component={props => <ContentPostDetail {...props} />}
                />
              </Switch>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  getCategories
};

export default connect(
  undefined,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(App));
