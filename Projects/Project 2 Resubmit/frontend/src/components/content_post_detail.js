import _ from "lodash";

import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// https://github.com/TeamWertarbyte/mdi-material-ui
// https://materialdesignicons.com
import { CommentRemove, ThumbDown, ThumbUp } from "mdi-material-ui";

// components
import SideBar from "./side_bar.js";
import PostEditModalDetail from "./post_edit_modal_detail";
import CommentNewModalDetail from "./comment_new_modal_detail";
import CommentEditModalDetail from "./comment_edit_modal_detail";

// actions
import {
  getCategories,
  getPost,
  getPosts,
  getComments,
  postUpVotePost,
  postDownVotePost,
  postUpVoteComment,
  postDownVoteComment,
  deleteDeletePost,
  deleteDeleteComment
} from "../actions";

import styles from "../styles";
import { formatDate } from "../utils";

class ContentPostDetail extends Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const { match, getPost, getPosts, getComments, getCategories } = this.props;

    getCategories();
    getPosts();

    getPost(match.params.post_id);
    getComments(match.params.post_id);
  }

  render() {
    const {
      classes,
      theme,
      post,
      posts,
      match,
      comments,
      onPostUpVotePost,
      onPostDownVotePost,
      onPostUpVoteComment,
      onPostDownVoteComment,
      onDeleteDeletePost,
      onDeleteDeleteComment
    } = this.props;

    if (!_.find(posts, ["id", match.params.post_id])) {
      window.location = "/404";
    }

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.hide
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Readable App - Jesse Quinn
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <SideBar {...this.props} />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
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
                  <PostEditModalDetail initialValues={post} {...this.props} />
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
                      typeof post.commentCount !== "undefined" ||
                      !isNaN(post.commentCount)
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
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <CommentNewModalDetail pid={post.id} {...this.props} />
                </CardContent>
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
                          onPostUpVoteComment(comment.id);
                        }}
                      >
                        <ThumbUp className={classes.spacing} />
                      </IconButton>
                      <Typography color="textSecondary">
                        {comment.voteScore}
                      </Typography>
                      <IconButton
                        className={classes.button}
                        onClick={() => {
                          onPostDownVoteComment(comment.id);
                        }}
                      >
                        <ThumbDown className={classes.spacing} />
                      </IconButton>
                      <CommentEditModalDetail
                        form={comment.id}
                        initialValues={comment}
                        {...this.props}
                      />
                      <IconButton
                        onClick={() => {
                          onDeleteDeleteComment(comment.id);
                        }}
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
        </main>
      </div>
    );
  }
}

ContentPostDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories,
  post: state.post,
  posts: state.posts,
  comments: state.comments
});

const mapDispatchToProps = {
  getCategories,
  getPost,
  getPosts,
  getComments,
  onPostUpVotePost: postUpVotePost,
  onPostDownVotePost: postDownVotePost,
  onPostUpVoteComment: postUpVoteComment,
  onPostDownVoteComment: postDownVoteComment,
  onDeleteDeletePost: deleteDeletePost,
  onDeleteDeleteComment: deleteDeleteComment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ContentPostDetail));
