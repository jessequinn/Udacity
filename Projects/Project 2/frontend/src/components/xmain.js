import _ from "lodash";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

class Main extends Component {
  state = {
    orderByVoteScore: false,
    orderByTimeStamp: false,
    value: "none"
  };

  formatDate = timestamp => moment(timestamp).format("LLLL");

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  checkOrderByVoteScore(e) {
    let itemChecked = this.state.orderByVoteScore;
    itemChecked = e.target.checked;
    this.setState({ orderByVoteScore: itemChecked });
  }

  checkOrderByTimeStamp(e) {
    let itemChecked = this.state.orderByTimeStamp;
    itemChecked = e.target.checked;
    this.setState({ orderByTimeStamp: itemChecked });
  }

  render() {
    const { posts, categories } = this.props;
    const { orderByVoteScore, orderByTimeStamp, value } = this.state;

    let sortedPosts;
    if (orderByVoteScore) {
      sortedPosts = _.orderBy(posts, ["voteScore"], ["asc"]);
    } else if (orderByTimeStamp) {
      sortedPosts = _.orderBy(posts, ["timestamp"], ["desc"]);
    } else {
      sortedPosts = posts;
    }

    return (
      <div className="col s12 m8 l9">
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Button>
        <div className="fixed-action-btn">
          <div id="createPost" className="modal">
            <div className="modal-content">
              <div className="row">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s6">
                      <input id="first_name" type="text" className="validate" />
                      <label htmlFor="first_name">First Name</label>
                    </div>
                    <div className="input-field col s6">
                      <input id="last_name" type="text" className="validate" />
                      <label htmlFor="last_name">Last Name</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input id="title" type="text" className="validate" />
                      <label htmlFor="title">Title</label>
                    </div>
                    <div className="input-field col s6">
                      <select
                        value={this.state.value}
                        onChange={this.handleChange}
                      >
                        <option value="none" disabled>
                          Choose your option
                        </option>
                        {_.map(categories, category => {
                          return (
                            <option value={category.name} key={category.name}>
                              {category.name}
                            </option>
                          );
                        })}
                      </select>
                      <label>Category</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <textarea
                        id="textarea1"
                        className="materialize-textarea"
                      />
                      <label htmlFor="textarea1">Content</label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <a
                href="#!"
                className="modal-close waves-effect waves-green btn-flat"
              >
                Close
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s6 center-align">
            <p>Order by Vote Score</p>
            <div className="switch">
              <label>
                Descending
                <input
                  onChange={e => this.checkOrderByVoteScore(e)}
                  disabled={orderByTimeStamp === true ? "true" : null}
                  type="checkbox"
                />
                <span className="lever" />
                Ascending
              </label>
            </div>
          </div>
          <div className="col s6 center-align">
            <p>Order by Time</p>
            <div className="switch">
              <label>
                Ascending
                <input
                  onChange={e => this.checkOrderByTimeStamp(e)}
                  disabled={orderByVoteScore === true ? "true" : null}
                  type="checkbox"
                />
                <span className="lever" />
                Descending
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <div className="collection">
              {_.map(sortedPosts, post => {
                return (
                  <li className="collection-item avatar" key={post.id}>
                    <span className="title">{post.title}</span>
                    <p>
                      {post.author} <br /> {post.body}
                    </p>
                    <hr />
                    <span className="">{this.formatDate(post.timestamp)}</span>
                    <span
                      className="new badge teal"
                      data-badge-caption={post.category}
                    >
                      Category
                    </span>
                    <span
                      className="new badge teal"
                      data-badge-caption={post.voteScore}
                    >
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
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  categories: state.categories
});

export default withRouter(connect(mapStateToProps)(Main));
