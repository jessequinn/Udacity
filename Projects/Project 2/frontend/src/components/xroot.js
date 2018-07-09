import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { fetchCategories, fetchPosts } from "../actions";
import moment from "moment";

class root extends Component {
  state = {
    categorySelect: ""
  }
  
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  renderCategories() {
    return _.map(this.props.categories, category => {
      return (
        <a href="#!" className="collection-item" key={category.name}>
          {category.name}
        </a>
      );
    });
  }

  formatDate = timestamp => moment(timestamp).format("LLLL");

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="collection-item avatar" key={post.id}>
          <span className="title">{post.title}</span>
          <p>
            {post.author} <br /> {post.body}
          </p>
          <hr />
          <span className="">{this.formatDate(post.timestamp)}</span>
          <span className="new badge teal" data-badge-caption={post.category}>
            Category
          </span>
          <span className="new badge teal" data-badge-caption={post.voteScore}>
            Vote Score
          </span>
          <span
            className="new badge teal"
            data-badge-caption={post.commentCount}
          >
            Comments
          </span>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m4 l3">
            <div className="collection">{this.renderCategories()}</div>
          </div>
          <div className="col s12 m8 l9">
            <ul className="collection">{this.renderPosts()}</ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories, posts: state.posts };
}

export default connect(
  mapStateToProps,
  { fetchCategories, fetchPosts }
)(root);
