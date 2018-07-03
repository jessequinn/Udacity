import React, { Component } from "react";
import PropTypes from "prop-types";
import sortBy from "sort-by";
import escapeRegExp from "escape-string-regexp";

export default class Search extends Component {
  static propTypes = {
    booksShelved: PropTypes.array.isRequired,
    onSearchBooks: PropTypes.func.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired,
    processedBooks: PropTypes.array.isRequired
  };

  state = {
    query: "",
    previousQuery: ""
  };

  processQueryString = query => {
    return query
      .split(" ")
      .map(word => word.replace(/[^a-z\s]+/gi, ""))
      .join(" ")
      .replace(/[\s]+/gi, " ");
  };

  updateQuery = query => {
    this.setState({ query });
    this.setState({
      previousQuery: this.state.query
    });
    console.log(`${this.state.query} and ${this.state.previousQuery}`);
  };

  clearQuery = () => {
    this.setState({ query: "", previousQuery: "" });
  };

  render() {
    const { query, previousQuery } = this.state;
    const { onChangeBookshelf, onSearchBooks, processedBooks } = this.props;

    let showingBooks;
    if (query !== previousQuery) {
      const match = this.processQueryString(escapeRegExp(query));
      onSearchBooks(match);
      showingBooks = processedBooks;
    } else {
      showingBooks = processedBooks;
    }

    showingBooks.sort(sortBy("id"));

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
              <a href="/" className="btn btn-info" onClick={this.clearQuery}>
                Return
              </a>
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
                        alt="Card cap"
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
