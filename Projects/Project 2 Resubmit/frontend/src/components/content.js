import React from "react";
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md
import { withRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

// material-ui
import Grid from "@material-ui/core/Grid";

// components
import ContentPostList from "./content_post_list";
import ContentPostForm from "./content_post_form";

// call actions
import { postUpVotePost, postDownVotePost, deleteDeletePost } from "../actions";

const Content = props => {
  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Switch>
          <Route
            exact
            path="/"
            component={props => <ContentPostList {...props} />}
          />
          <Route
            path="/:category"
            exact
            component={props => <ContentPostList {...props} />}
          />
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
  categories: state.categories
});

const mapDispatchToProps = {
  onPostUpVotePost: postUpVotePost,
  onPostDownVotePost: postDownVotePost,
  onDeleteDeletePost: deleteDeletePost
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Content)
);
