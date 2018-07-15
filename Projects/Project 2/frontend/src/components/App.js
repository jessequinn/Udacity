import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

// material-ui
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

// Site framework
import Content from "./content";
import SideBar from "./side_bar";

// call actions
import { getAllCategories } from "../actions/categories";
import { getAllPostsAndComments } from "../actions/posts";

// set width of material-ui drawer (sidebar navigation)
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    height: "auto",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`
  },
  "appBar-left": {
    marginLeft: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

class App extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPostsAndComments();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, classes[`appBar-left`])}
          >
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                Readable App - Jesse Quinn
              </Typography>
            </Toolbar>
          </AppBar>
          <SideBar /> {/* class for material-ui drawer */}
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Content />
          </main>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    undefined,
    {
      fetchCategories: getAllCategories,
      fetchPostsAndComments: getAllPostsAndComments
    }
  )(withStyles(styles)(App))
);
