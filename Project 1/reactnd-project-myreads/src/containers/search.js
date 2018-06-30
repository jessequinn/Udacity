import React, { Component } from "react";
import { Link } from "react-router-dom";
import sortBy from "sort-by";
import escapeRegExp from "escape-string-regexp";
import * as BooksAPI from "../actions/books_api";

export default class Search extends Component {
  state = {
    query: "",
    searchResults: []
  };

  updateQuery = query => {
    this.setState({ query: query });
  };

  search(query) {
    BooksAPI.search(escapeRegExp(query)).then(searchResults => {
      this.setState({ searchResults });
    });

    return this.state.searchResults;
  }

  update(book, shelf) {
    BooksAPI.update(book, shelf);
  }

  getInfo(bookId) {
    return BooksAPI.get(bookId);
  }

  render() {
    const { query, searchResults } = this.state;

    let showingBooks;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingBooks = this.search(query);
    } else {
      showingBooks = [];
    }

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
                          onClick={() => this.update(book, "currentlyReading")}
                          type="button"
                          className="btn btn-warning btn-sm"
                          disabled={
                            book.shelf === "currentlyReading"
                              ? "disabled"
                              : null
                          }
                        >
                          <i className="fab fa-readme" />
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
