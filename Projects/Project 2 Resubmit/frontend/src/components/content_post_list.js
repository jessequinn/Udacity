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
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

// https://github.com/TeamWertarbyte/mdi-material-ui
// https://materialdesignicons.com
import { CommentRemove, ThumbDown, ThumbUp } from "mdi-material-ui";

// components
import SideBar from "./side_bar.js";
// import ModalToggle from "./modal_toggle";
import PostEditModal from "./post_edit_modal";
import CommentNewModalDetail from "./comment_new_modal_detail";

// call actions
import {
  getCategories,
  getPosts,
  getPostsForCategory,
  postUpVotePost,
  postDownVotePost,
  deleteDeletePost
} from "../actions";

// style
import styles from "../styles";

// util
import { formatDate } from "../utils";

class ContentPostList extends Component {
  state = {
    open: false,
    orderByVoteScore: false,
    orderByTimeStamp: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  checkOrderByVoteScore = e => {
    let itemChecked = this.state.orderByVoteScore;
    itemChecked = e.target.checked;
    this.setState({ orderByVoteScore: itemChecked });
  };

  checkOrderByTimeStamp = e => {
    let itemChecked = this.state.orderByTimeStamp;
    itemChecked = e.target.checked;
    this.setState({ orderByTimeStamp: itemChecked });
  };

  componentDidMount() {
    const { match, getPosts, getPostsForCategory, getCategories } = this.props;

    getCategories();

    if (match.params.category) {
      getPostsForCategory(match.params.category);
    } else {
      getPosts();
    }
  }

  render() {
    const {
      classes,
      theme,
      posts,
      onPostUpVotePost,
      onPostDownVotePost,
      onDeleteDeletePost
    } = this.props;

    const { orderByVoteScore, orderByTimeStamp } = this.state;

    let sortedPosts;
    if (orderByVoteScore) {
      sortedPosts = _.sortBy(posts, [
        function(o) {
          return -o.voteScore;
        }
      ]);
    } else if (orderByTimeStamp) {
      sortedPosts = _.orderBy(posts, ["timestamp"], ["desc"]);
    } else {
      sortedPosts = _.sortBy(posts, [
        function(o) {
          return o.voteScore;
        }
      ]);
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
                                disabled={
                                  orderByTimeStamp === true ? true : null
                                }
                                color="primary"
                              />
                            }
                            label="Order by Vote Score (Highest to Lowest)"
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                onChange={e => this.checkOrderByTimeStamp(e)}
                                disabled={
                                  orderByVoteScore === true ? true : null
                                }
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
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
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
                          <PostEditModal
                            form={post.id}
                            initialValues={post}
                            {...this.props}
                          />
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
                          <Grid container spacing={24}>
                            <Grid item xs={12} align="right">
                              <CommentNewModalDetail
                                pid={post.id}
                                {...this.props}
                              />
                            </Grid>
                          </Grid>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

ContentPostList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories,
  posts: state.posts
});

const mapDispatchToProps = {
  getCategories,
  getPosts,
  getPostsForCategory,
  onPostUpVotePost: postUpVotePost,
  onPostDownVotePost: postDownVotePost,
  onDeleteDeletePost: deleteDeletePost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ContentPostList));
