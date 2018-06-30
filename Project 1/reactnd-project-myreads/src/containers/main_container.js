import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import sortBy from "sort-by";
import * as BooksAPI from "../actions/books_api";

export default class MainContainer extends Component {
  static propTypes = {
    books: propTypes.array.isRequired
  };

  update(book, shelf) {
    this.onUpdateBooks = BooksAPI.update(book, shelf)
  }

  BookDialog(books, shelf) {
    return (
      <div className="row">
        <div className="col">
          {!books.error && (
            <div className="card-columns">
              {books.filter((book) => book.shelf === shelf).map((book) => (
                <div className="card" key={book.id}>
                  {book.imageLinks.smallThumbnail && (
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
                        <i className="fas fa-book" />
                      </button>
                      <button
                        onClick={() => this.update(book, "wantToRead")}
                        type="button"
                        className="btn btn-warning btn-sm"
                        disabled={
                          book.shelf === "wantToRead"
                            ? "disabled"
                            : null
                        }
                      >
                        <i className="fab fa-readme" />
                      </button>
                      <button
                        onClick={() => this.update(book, "read")}
                        type="button"
                        className="btn btn-warning btn-sm"
                        disabled={
                          book.shelf === "read"
                            ? "disabled"
                            : null
                        }
                      >
                        <i className="fas fa-archive" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  render() {
    const { books } = this.props;

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
          <div className="col">
            <h4>Current Reading</h4>
          </div>
        </div>
        {this.BookDialog(books,"currentlyReading")}
        <div className="row">
          <div className="col">
            <h4>Want to Read</h4>
          </div>
        </div>
        {this.BookDialog(books, "wantToRead")}
        <div className="row">
          <div className="col">
            <h4>Read</h4>
          </div>
        </div>
        {this.BookDialog(books, "read")}
      </div>
    );
  }
}
