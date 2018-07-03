import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../actions/books_api";

class SearchBooks extends Component {
  state = {
    term: "",
    searchResults: []
  };

  componentDidMount() {
    this.setState({ term: "", searchResults: [] });
  }

  searchBooks = query => {
    if (!query) {
      return;
    }

    BooksAPI.search(query).then(searchResults => {
      if (searchResults.error) {
        this.setState({
          searchResults: []
        });
      } else {
        this.setState({
          searchResults
        });
      }
    });
  };

  render() {
    const { term } = this.state;

    // print search term
    console.log(term);

    const search = _.debounce(query => {
      this.searchBooks(query);
    }, 300);

    return (
      <div className="container">
        <form>
          <div className="form-group row">
            <div className="col-11">
              <input
                className="form-control"
                type="text"
                placeholder="Search for your favourite book!"
                value={term}
                onChange={event => this.onInputChange(event.target.value)}
              />
            </div>
            <div className="col-1">
              <Link to="/" className="btn btn-info">
                Return
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }

  onInputChange(term) {
    this.setState({ term });
    this.search(term);
  }
}

export default SearchBooks;
