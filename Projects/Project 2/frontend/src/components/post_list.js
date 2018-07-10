import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class PostList extends Component {
  render() {
    const { selectedPosts } = this.props;
    console.log(selectedPosts);

    return <div>Test</div>;
  }
}

export default withRouter(PostList);
