import _ from "lodash";

import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// material-ui
import Grid from "@material-ui/core/Grid";

const Content = props => {
  const { posts } = props;
  // console.log(posts);

  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        {_.map(posts, post => {
          return <div key={post.id}>{post.title}</div>;
        })}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default withRouter(connect(mapStateToProps)(Content));
