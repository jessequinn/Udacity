import _ from "lodash";
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FormatListNumbered from "@material-ui/icons/FormatListNumbered";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const Sidebar = props => {
  const { classes, categories } = props;

  return (
    <div className={classes.root}>
      <List component="nav">
        {_.map(categories, category => {
          return (
            <ListItem button key={category.name}>
              <ListItemIcon>
                <FormatListNumbered />
              </ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

const mapStateToProps = ({ categories }) => ({
  categories
});

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(Sidebar))
);
