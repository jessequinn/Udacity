import React from "react";
import { connect } from "react-redux";
import { withRouter, Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
// import MenuItem from "@material-ui/core/MenuItem";
// import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Home from "@material-ui/icons/Home";

import CategoryListItems from "./category_list_items";
import Main from "./main";
import PostList from "./post_list";
import { fetchCategories, fetchPosts } from "../actions";

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
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

class App extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  selectiveCategory = (posts, category) => {
    posts.filter(post => post.category === category);
  };

  render() {
    const { classes, posts } = this.props;

    const drawer = (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem
            component={Link}
            to="/"
            button
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <CategoryListItems />
        </List>
      </Drawer>
    );

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
          {drawer}
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route
                exact
                path="/categories/:name"
                render={({ match }) => (
                  <PostList
                    selectedPosts={this.selectiveCategory(
                      posts,
                      match.params.name
                    )}
                  />
                )}
              />
              <Route exact path="/" render={() => <Main />} />
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchCategories, fetchPosts }
  )(withStyles(styles)(App))
);
