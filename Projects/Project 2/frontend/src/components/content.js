import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

// material-ui
import Grid from "@material-ui/core/Grid";

// import PostForm from './post-form';
import ContentPostList from './content_post_list';

// import PostDetail from './post-detail';
import { getSortedPostsWithSortedComments } from "../selectors/index";

class Content extends Component {
  // filterPostByCategory(posts, category) {
  //   return posts.filter(post => post.category === category);
  // }
  //
  // filterPostById(posts, id) {
  //   return posts.filter(post => post.id === id)[0];
  // }

  render() {
    const { posts } = this.props;

    return (
      <Grid container spacing={24}>
        <Switch>
          <Route exact path="/" render={() => <ContentPostList posts={posts} />} />
        </Switch>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: getSortedPostsWithSortedComments(state)
});

export default withRouter(connect(mapStateToProps)(Content));
