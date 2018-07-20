import _ from "lodash";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// material-ui
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Fingerprint from "@material-ui/icons/Fingerprint";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

// https://github.com/TeamWertarbyte/mdi-material-ui
// https://materialdesignicons.com
import {
  CommentRemove,
  ThumbDown,
  ThumbUp,
  TooltipEdit
} from "mdi-material-ui";

import styles from "../styles";
import { formatDate } from "../utils";

// actions
import { getPost, getComments } from "../actions";

class ContentPostDetail extends Component {
  componentWillMount() {
    const { match, getPost, getComments } = this.props;
    getPost(match.params.id);
    getComments(match.params.id);
  }

  render() {
    const {
      classes,
      post,
      comments,
      onPostUpVotePost,
      onPostDownVotePost,
      onDeleteDeletePost
    } = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      <Button
                        size="small"
                        variant="outlined"
                        component={Link}
                        to="/posts/new"
                      >
                        New Post
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary">
                    {formatDate(post.timestamp)}
                    <Button disabled>
                      <Fingerprint /> {post.category}
                    </Button>
                  </Typography>
                  <Typography variant="headline" component="h2">
                    {post.title}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {`By ${post.author}`}
                  </Typography>
                  <Typography component="p">{post.body}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    className={classes.button}
                    onClick={() => {
                      onPostUpVotePost(post.id);
                    }}
                  >
                    <ThumbUp className={classes.spacing} />
                  </IconButton>
                  <Typography color="textSecondary">
                    {post.voteScore}
                  </Typography>
                  <IconButton
                    className={classes.button}
                    onClick={() => {
                      onPostDownVotePost(post.id);
                    }}
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
                      onDeleteDeletePost(post.id);
                    }}
                    component={Link}
                    to={"/"}
                    className={classes.button}
                  >
                    <CommentRemove className={classes.spacing} />
                  </IconButton>
                  <Badge
                    color="primary"
                    badgeContent={
                      typeof post.commentCount !== "undefined"
                        ? post.commentCount
                        : 0
                    }
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
          {_.map(comments, comment => {
            return (
              <Grid container spacing={24} key={comment.id}>
                <Grid item xs={12}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                      >
                        {formatDate(comment.timestamp)}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {`By ${comment.author}`}
                      </Typography>
                      <Typography component="p">{comment.body}</Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        className={classes.button}
                        onClick={() => {
                          onPostUpVotePost(post.id);
                        }}
                      >
                        <ThumbUp className={classes.spacing} />
                      </IconButton>
                      <Typography color="textSecondary">
                        {post.voteScore}
                      </Typography>
                      <IconButton
                        className={classes.button}
                        onClick={() => {
                          onPostDownVotePost(post.id);
                        }}
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
                          onDeleteDeletePost(post.id);
                        }}
                        component={Link}
                        to={"/"}
                        className={classes.button}
                      >
                        <CommentRemove className={classes.spacing} />
                      </IconButton>
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

ContentPostDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  comments: state.comments
});

const mapDispatchToProps = {
  getPost,
  getComments
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(ContentPostDetail))
);
