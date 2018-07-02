import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class MainContainer extends Component {
  static propTypes = {
    booksShelved: PropTypes.array.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired
  };

  bookDialog(onChangeBookshelf, books, shelf) {
    return (
      <div className="row">
        <div className="col">
          {!books.error && (
            <div className="card-columns">
              {books.filter(book => book.shelf === shelf).map(book => (
                <div className="card" key={book.id}>
                  {book.imageLinks.smallThumbnail && (
                    <img
                      className="card-img-top"
                      src={book.imageLinks.smallThumbnail}
                      alt="Card image cap"
                    />
                  )}
                  <div className="card-body">
                    {book.title && <h5 className="card-title">{book.title}</h5>}
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
                          book.shelf === "currentlyReading" ? "disabled" : null
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
                        <i className="fas fa-trash-alt" title="Remove - None" />
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

    const {onChangeBookshelf, booksShelved } = this.props
    console.log(booksShelved.map(c => `Book id: ${c.id}`));

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
        {booksShelved
          ? this.bookDialog(onChangeBookshelf, booksShelved, "currentlyReading")
          : null}
        <div className="row">
          <div className="col">
            <h4>Want to Read</h4>
          </div>
        </div>
        {booksShelved
          ? this.bookDialog(onChangeBookshelf, booksShelved, "wantToRead")
          : null}
        <div className="row">
          <div className="col">
            <h4>Read</h4>
          </div>
        </div>
        {booksShelved
          ? this.bookDialog(onChangeBookshelf, booksShelved, "read")
          : null}
      </div>
    );
  }
}
