import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

// material-ui
import Grid from "@material-ui/core/Grid";

// components
import ContentPostList from "./content_post_list";
import ContentPostForm from "./content_post_form";

// call actions
import { postUpVotePost, postDownVotePost } from "../actions";

const Content = props => {
  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Switch>
          <Route exact path="/" render={() => <ContentPostList {...props} />} />
          <Route
            exact
            path="/posts/new"
            render={() => <ContentPostForm {...props} />}
          />
        </Switch>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  posts: state.posts,
  categories: state.categories
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      onPostUpVotePost: postUpVotePost,
      onPostDownVotePost: postDownVotePost
    }
  )(Content)
);
