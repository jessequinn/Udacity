import _ from "lodash";
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// material-ui
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
import IconButton from "@material-ui/core/IconButton";

// helper contains formatting tools
import { formatDate } from "../utils/helper";

// call actions
import { upvotePost, downvotePost, deletePost } from "../actions/posts";

// https://github.com/TeamWertarbyte/mdi-material-ui
// https://materialdesignicons.com
import {
  CommentRemove,
  ThumbDown,
  ThumbUp,
  TooltipEdit
} from "mdi-material-ui";

// import NoMatch from "./no_match";

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
    width: 18,
    height: 18
  },
  leftBorderHighlight: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    paddingLeft: 0,
    marginLeft: 0
  }
});

class ContentPostList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    orderByVoteScore: false,
    orderByTimeStamp: false
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
    const {
      classes,
      posts,
      onUpVotePost,
      onDownVotePost,
      onDeletePost
    } = this.props;

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
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container spacing={24}>
                    <Grid item xs={10}>
                      <Button
                        size="small"
                        variant="outlined"
                        component={Link}
                        to="/posts/new"
                      >
                        New Post
                      </Button>
                    </Grid>
                    <Grid item xs={2} className={classes.leftBorderHighlight}>
                      <Typography variant="caption">
                        {`Numer of Posts: ${_.size(posts)}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {_.size(posts) > 1 ? (
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
                        label="Order by Vote Score (Lowest to Highest)"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            onChange={e => this.checkOrderByTimeStamp(e)}
                            disabled={orderByVoteScore === true ? true : null}
                            color="primary"
                          />
                        }
                        label="Order by Time (Newest to Oldest)"
                      />
                    </FormGroup>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : null}
          {_.size(posts) !== 0 ? null : (
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container spacing={24}>
                      <Grid item xs={12}>
                        <Typography
                          variant="subheading"
                          gutterBottom
                          align="center"
                        >
                          No Posts available.
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
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
                        {formatDate(post.timestamp)}
                        <Button disabled>
                          <Fingerprint /> {post.category}
                        </Button>
                      </Typography>
                      <Button
                        component={Link}
                        to={`/${post.category}/${post.id}`}
                        className={classes.link}
                      >
                        <Typography variant="headline" component="h2">
                          {post.title}
                        </Typography>
                      </Button>
                      <Typography className={classes.pos} color="textSecondary">
                        {post.author}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        onClick={() => {
                          onUpVotePost(post.id);
                        }}
                        className={classes.button}
                      >
                        <ThumbUp className={classes.spacing} />
                      </IconButton>
                      <Typography color="textSecondary">
                        {post.voteScore}
                      </Typography>
                      <IconButton
                        onClick={() => {
                          onDownVotePost(post.id);
                        }}
                        className={classes.button}
                      >
                        <ThumbDown className={classes.spacing} />
                      </IconButton>
                      <IconButton
                        component={Link}
                        to={`/${post.category}/${post.id}/edit`}
                        className={classes.button}
                      >
                        <TooltipEdit className={classes.spacing} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          onDeletePost(post.id);
                        }}
                        component={Link}
                        to={"/"}
                        className={classes.button}
                      >
                        <CommentRemove className={classes.spacing} />
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

export default withRouter(
  connect(
    undefined,
    {
      onUpVotePost: upvotePost,
      onDownVotePost: downvotePost,
      onDeletePost: deletePost
    }
  )(withStyles(styles)(ContentPostList))
);
