import _ from "lodash";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Fingerprint from "@material-ui/icons/Fingerprint";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";

// helper contains formatting tools
import * as HELPER from "../utils/helper";
import PostModal from "./post_modal";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  card: {
    minWidth: 275,
    margin: theme.spacing.unit * 2
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  fab: {
    margin: theme.spacing.unit * 2
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  }
});

class Main extends Component {
  state = {
    orderByVoteScore: false,
    orderByTimeStamp: false,
    open: false,
    value: "none"
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({ value: event.target.value });
  };

  checkOrderByVoteScore(e) {
    let itemChecked = this.state.orderByVoteScore;
    itemChecked = e.target.checked;
    this.setState({ orderByVoteScore: itemChecked });
  }

  checkOrderByTimeStamp(e) {
    let itemChecked = this.state.orderByTimeStamp;
    itemChecked = e.target.checked;
    this.setState({ orderByTimeStamp: itemChecked });
  }

  render() {
    const { classes, posts } = this.props;

    const { orderByVoteScore, orderByTimeStamp } = this.state;

    let sortedPosts;
    if (orderByVoteScore) {
      sortedPosts = _.orderBy(posts, ["voteScore"], ["asc"]);
    } else if (orderByTimeStamp) {
      sortedPosts = _.orderBy(posts, ["timestamp"], ["desc"]);
    } else {
      sortedPosts = posts;
    }

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  onChange={e => this.checkOrderByVoteScore(e)}
                  disabled={orderByTimeStamp === true ? true : null}
                  color="primary"
                />
              }
              label="Order by Vote Score (Ascending)"
            />
            <FormControlLabel
              control={
                <Switch
                  onChange={e => this.checkOrderByTimeStamp(e)}
                  disabled={orderByVoteScore === true ? true : null}
                  color="primary"
                />
              }
              label="Order by Time (Descending)"
            />
          </FormGroup>
        </Grid>
        {_.map(sortedPosts, post => {
          return (
            <Grid item xs={12} key={post.id}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary">
                    {HELPER.formatDate(post.timestamp)}
                    <Button disabled className={classes.button}>
                      <Fingerprint /> {post.category}
                    </Button>
                  </Typography>
                  <Typography variant="headline" component="h2">
                    {post.title}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {post.author}
                  </Typography>
                  <Typography component="p">{post.body}</Typography>
                </CardContent>
                <CardActions>
                  <Badge
                    color="primary"
                    badgeContent={post.voteScore}
                    className={classes.margin}
                  >
                    <Typography className={classes.padding}>
                      Vote Score
                    </Typography>
                  </Badge>
                  <Badge
                    color="primary"
                    badgeContent={post.commentCount}
                    className={classes.margin}
                  >
                    <Typography className={classes.padding}>
                      Comments
                    </Typography>
                  </Badge>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
        <Tooltip title="Add New Post">
          <Button
            variant="fab"
            color="secondary"
            className={classes.absolute}
            onClick={this.handleOpen}
          >
            <AddIcon />
          </Button>
        </Tooltip>
        <PostModal modalOpen={this.state.open} modalClose={this.handleClose}/>
      </Grid>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  categories: state.categories
});

// const SimpleModalWrapped = withStyles(styles)(Main);
export default withRouter(connect(mapStateToProps)(withStyles(styles)(Main)));
