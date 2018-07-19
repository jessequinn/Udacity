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
import {
  getPostsWithComments,
  getPostsFromCategoryWithComments
} from "../actions";

class ContentPostList extends Component {
  componentWillMount() {
    const {
      match,
      getPostsWithComments,
      getPostsFromCategoryWithComments
    } = this.props;

    if (match.params.category) {
      getPostsFromCategoryWithComments(match.params.category);
    } else {
      getPostsWithComments();
    }
  }

  render() {
    const {
      classes,
      posts,
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
          {_.map(posts, post => {
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
                        {`By ${post.author}`}
                      </Typography>
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

ContentPostList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

const mapDispatchToProps = {
  getPostsWithComments,
  getPostsFromCategoryWithComments
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(ContentPostList))
);
