import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

// material-ui
import Grid from "@material-ui/core/Grid";

import ContentPostList from "./content_post_list";
import ContentPostForm from "./content_post_form";
import ContentPostDetail from "./content_post_detail";
import { getSortedPostsWithSortedComments } from "../selectors/index";

class Content extends Component {
  filterPostByCategory(posts, category) {
    return posts.filter(post => post.category === category);
  }

  filterPostById(posts, id) {
    return posts.filter(post => post.id === id)[0];
  }

  render() {
    const { posts } = this.props;

    return (
      <Grid container spacing={24}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <ContentPostList posts={posts} />}
          />
          <Route exact path="/posts/new" component={ContentPostForm} />
          <Route
            exact
            path="/posts/:id"
            render={({ match }) => (
              <ContentPostDetail
                {...this.filterPostById(posts, match.params.id)}
              />
            )}
          />
          <Route
            exact
            path="/posts/:id/edit"
            render={({ match }) => (
              <ContentPostForm
                initialValues={this.filterPostById(posts, match.params.id)}
              />
            )}
          />
        </Switch>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  posts: getSortedPostsWithSortedComments(state)
});

export default withRouter(connect(mapStateToProps)(Content));
