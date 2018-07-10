import _ from "lodash";
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Fingerprint from "@material-ui/icons/Fingerprint";

const CategoryListItems = props => {
  const { categories } = props;

  return (
    <div>
      {_.map(categories, category => {
        return (
          <ListItem
            component={Link}
            to={`/categories/${category.name}`}
            button
            key={category.name}
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

export default withRouter(connect(mapStateToProps)(CategoryListItems));
