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
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import IconButton from "@material-ui/core/IconButton";

// helper contains formatting tools
import * as HELPER from "../utils/helper";

// call actions
import { upVotePost, downVotePost } from "../actions/";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  card: {
    minWidth: 275,
    margin: theme.spacing.unit
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  spacing: {
    width: 15,
    height: 15
  }
});

class ContentGridPostList extends Component {
  state = {
    orderByVoteScore: false,
    orderByTimeStamp: false
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
    const { classes, posts, onUpVotePost, onDownVotePost } = this.props;

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
      <Grid item xs={12}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {_.map(sortedPosts, post => {
            return (
              <Grid container spacing={24} key={post.id}>
                <Grid item xs={12}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                      >
                        {HELPER.formatDate(post.timestamp)}
                        <Button disabled>
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
                      <IconButton
                        onClick={() => {
                          onUpVotePost(post.id);
                        }}
                        className={classes.button}
                        aria-label="Delete"
                      >
                        <ThumbUp className={classes.spacing} />
                      </IconButton>
                      <Typography color="textSecondary">
                        Votes: {post.voteScore}
                      </Typography>
                      <IconButton
                        onClick={() => {
                          onDownVotePost(post.id);
                        }}
                        className={classes.button}
                        aria-label="Delete"
                      >
                        <ThumbDown className={classes.spacing} />
                      </IconButton>
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
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

ContentGridPostList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default withRouter(
  connect(
    mapStateToProps,
    { onUpVotePost: upVotePost, onDownVotePost: downVotePost }
  )(withStyles(styles)(ContentGridPostList))
);
