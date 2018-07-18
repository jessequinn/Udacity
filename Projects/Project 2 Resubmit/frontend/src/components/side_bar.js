import _ from "lodash";

import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

// material-ui
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// icons are supplied by https://github.com/TeamWertarbyte/mdi-material-ui and https://materialdesignicons.com
import { Home, Fingerprint } from "mdi-material-ui";

const SideBar = props => {
  const { location, categories } = props;
  // console.log(categories);

  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <List>
          <ListItem
            component={Link}
            to="/"
            button
            disabled={location.pathname === "/" ? true : false}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {_.map(categories, category => {
            return (
              <ListItem
                component={Link}
                to={`/${category.name}`}
                button
                key={category.name}
                disabled={
                  location.pathname === `/${category.name}` ? true : false
                }
              >
                <ListItemIcon>
                  <Fingerprint />
                </ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  categories: state.categories
});

export default withRouter(connect(mapStateToProps)(SideBar));
