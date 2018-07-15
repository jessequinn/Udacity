import _ from "lodash";
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Fingerprint from "@material-ui/icons/Fingerprint";

// function produces the side bar categories. Links disabled when location is the same.
const SideBarCategories = ({ location, categories }) => {
  return (
    <div>
      {_.map(categories, category => {
        return (
          <ListItem
            component={Link}
            to={`/${category.name}`}
            button
            key={category.name}
            disabled={
              location.pathname === `/${category.name}`
                ? true
                : false
            }
          >
            <ListItemIcon>
              <Fingerprint />
            </ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItem>
        );
      })}
    </div>
  );
};

const mapStateToProps = ({ categories }) => ({
  categories
});

export default withRouter(connect(mapStateToProps)(SideBarCategories));
