import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  card: {
    minWidth: 275,
    margin: theme.spacing.unit
  },
  leftBorderHighlight: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  }
});

class ContentGridCreatePost extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, posts } = this.props;

    return (
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container spacing={24}>
              <Grid item xs={10}>
                <Button
                  size="small"
                  onClick={this.handleOpen}
                  className={classes.button}
                >
                  Create Post
                </Button>
              </Grid>
              <Grid
                item
                xs={2}
                className={classes.leftBorderHighlight}
              >
                <Typography variant="caption">
                  {`Numer of Posts: ${_.size(posts)}`}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

ContentGridCreatePost.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps)(
  withStyles(styles)(ContentGridCreatePost)
);
