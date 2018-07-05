import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ListShelvedBooks from "../actions/list_shelved_books";
import PropTypes from "prop-types";

class ShelvedBooks extends Component {
  static propTypes = {
    shelvedBooks: PropTypes.array.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired
  };

  render() {
    const { shelvedBooks, onChangeBookshelf } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-11">
            <h1>
              <strong>Looking for a book?</strong>
            </h1>
          </div>
          <div className="col-1">
            <Link to="/search" className="btn btn-info">
              Search Books
            </Link>
          </div>
        </div>
        <div className="row">
          {shelvedBooks
            ? ListShelvedBooks.listShelvedBooks(
                onChangeBookshelf,
                shelvedBooks,
                "currentlyReading"
              )
            : null}
        </div>
        <div className="row">
          {shelvedBooks
            ? ListShelvedBooks.listShelvedBooks(
                onChangeBookshelf,
                shelvedBooks,
                "wantToRead"
              )
            : null}
        </div>
        <div className="row">
          {shelvedBooks
            ? ListShelvedBooks.listShelvedBooks(
                onChangeBookshelf,
                shelvedBooks,
                "read"
              )
            : null}
        </div>
      </div>
    );
  }
}

export default ShelvedBooks;
