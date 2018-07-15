import _ from "lodash";
import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

// material-ui
import Grid from "@material-ui/core/Grid";

import ContentPostList from "./content_post_list";
import ContentPostForm from "./content_post_form";
import ContentPostDetail from "./content_post_detail";
import { getSortedPostsWithSortedComments } from "../selectors/index";
import NoMatch from "./no_match";

class Content extends Component {
  filterPostByCategory(posts, category) {
    return posts.filter(post => post.category === category);
  }

  filterPostById(posts, id) {
    return posts.filter(post => post.id === id)[0];
  }

  render() {
    const { posts, categories } = this.props;

    return (
      <Grid container spacing={24}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <ContentPostList posts={posts} />}
          />
          <Route exact path="/404" component={NoMatch} />
          <Route exact path="/posts/new" component={ContentPostForm} />
          <Route
            exact
            path="/:name"
            render={({ match }) => (
              <ContentPostList
                posts={
                  !_.find(categories, ["name", match.params.name])
                    ? (window.location = "/404")
                    : this.filterPostByCategory(posts, match.params.name)
                }
              />
            )}
          />
          <Route
            exact
            path="/:name/:id"
            render={({ match }) =>
              !_.find(posts, ["id", match.params.id]) ? (
                (window.location = "/404")
              ) : (
                <ContentPostDetail
                  {...this.filterPostById(posts, match.params.id)}
                />
              )
            }
          />
          <Route
            exact
            path="/:name/:id/edit"
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
  posts: getSortedPostsWithSortedComments(state),
  categories: state.categories
});

export default withRouter(connect(mapStateToProps)(Content));
