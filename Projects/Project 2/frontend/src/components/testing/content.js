import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

// import PostModal from "./post_modal";
import ContentGridCreatePost from "./content_grid_create_post";
import ContentGridPostList from "./content_grid_post_list";

class Content extends Component {
  render() {
    return (
      <Grid container spacing={24}>
        <ContentGridCreatePost />
        <ContentGridPostList />
        <ContentGridCreatePost />
      </Grid>
    );
  }
}

export default Content;
