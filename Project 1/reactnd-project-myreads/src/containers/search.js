import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../actions/books_api";
import PropTypes from "prop-types";
// import { DebounceInput } from 'react-debounce-input';

export default class Search extends Component {
  static propTypes = {
    booksShelved: PropTypes.array.isRequired,
    onFetchBooksFromAPI: PropTypes.func.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired
  };

  state = {
    query: "",
    searchResults: []
  };

  // componentDidMount() {
  //   if (this.props.booksShelved.length === 0) {
  //     this.props.onFetchBooksFromAPI();
  //   }
  //
  //   this.searchBooks();
  // }
  //
  componentDidMount() {
    this.clearQuery();
  }

  searchBooks(query) {
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

    return this.state.searchResults;
  }

  processQueryString(query) {
    return query
      .split(" ")
      .map(word => word.replace(/[^a-z\s]+/gi, ""))
      .join(" ")
      .replace(/[\s]+/gi, " ");
  }

  updateQuery(query) {
    query = this.processQueryString(query);
    this.setState({ query });
    this.searchBooks(query);
  }

  clearQuery() {
    this.setState({ query: "" });
  }

  clearSearchResults() {
    this.setState({ searchResults: [] });
  }

  render() {
    const { query } = this.state;
    const { onChangeBookshelf } = this.props;

    let showingBooks;
    if (query) {
      const match = this.processQueryString(query);
      showingBooks = this.searchBooks(match);
    } else {
      showingBooks = [];
    }

    //console.log(showingBooks.map(c => `Book shelf: ${c.shelf}`));

    return (
      <div className="container">
        <form>
          <div className="form-group row">
            <div className="col-11">
              <input
                className="form-control"
                type="text"
                placeholder="Search for your favourite book!"
                value={query}
                onChange={event => this.updateQuery(event.target.value)}
              />
            </div>
            <div className="col-1">
              <Link to="/" className="btn btn-info">
                Return
              </Link>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col">
            {!showingBooks.error && (
              <div className="card-columns">
                {showingBooks.map(book => (
                  <div className="card" key={book.id}>
                    {book.imageLinks && (
                      <img
                        className="card-img-top"
                        src={book.imageLinks.smallThumbnail}
                        alt="Card image cap"
                      />
                    )}
                    <div className="card-body">
                      {book.title && (
                        <h5 className="card-title">{book.title}</h5>
                      )}
                      {book.subtitle && (
                        <h6 className="card-subtitle mb-2 text-muted">
                          {book.subtitle}
                        </h6>
                      )}
                      {book.authors && (
                        <p className="card-text">{book.authors.join(", ")}</p>
                      )}
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button
                          onClick={() =>
                            onChangeBookshelf(book, "currentlyReading")
                          }
                          type="button"
                          className="btn btn-warning btn-sm"
                          disabled={
                            book.shelf === "currentlyReading"
                              ? "disabled"
                              : null
                          }
                        >
                          <i
                            className="fab fa-readme"
                            title="Currently Reading"
                          />
                        </button>
                        <button
                          onClick={() => onChangeBookshelf(book, "wantToRead")}
                          type="button"
                          className="btn btn-warning btn-sm"
                          disabled={
                            book.shelf === "wantToRead" ? "disabled" : null
                          }
                        >
                          <i className="fas fa-book" title="Want to Read" />
                        </button>
                        <button
                          onClick={() => onChangeBookshelf(book, "read")}
                          type="button"
                          className="btn btn-warning btn-sm"
                          disabled={book.shelf === "read" ? "disabled" : null}
                        >
                          <i className="fas fa-archive" title="Read" />
                        </button>
                        <button
                          onClick={() => onChangeBookshelf(book, "none")}
                          type="button"
                          className="btn btn-danger btn-sm"
                          disabled={
                            !book.hasOwnProperty("shelf") ? "disabled" : null
                          }
                        >
                          <i
                            className="fas fa-trash-alt"
                            title="Remove - None"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
