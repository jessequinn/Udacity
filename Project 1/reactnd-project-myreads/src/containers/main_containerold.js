import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

export default class MainContainer extends Component {
  static propTypes = {
    onAddCurrent: propTypes.func.isRequired,
    currentBooks: propTypes.array.isRequired,
    onAddWanted: propTypes.func.isRequired,
    wantedBooks: propTypes.array.isRequired,
    onAddRead: propTypes.func.isRequired,
    onRemoveBook: propTypes.func.isRequired,
    readBooks: propTypes.array.isRequired
  };

  BookDialog(Books) {
    return (
      <div className="row">
        <div className="col">
          <div className="card-columns">
            {Books.map(book => (
              <div className="card" key={book.id}>
                <img
                  className="card-img-top"
                  src={book.imageLinks.smallThumbnail}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {book.subtitle}
                  </h6>
                  <p className="card-text">{book.authors.join(", ")}</p>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      onClick={() => this.props.onAddCurrent(book)}
                      type="button"
                      className="btn btn-warning btn-sm"
                      disabled={
                        this.props.currentBooks.find(e => e.id === book.id)
                          ? "disabled"
                          : null
                      }
                    >
                      <i className="fab fa-readme" />
                    </button>
                    <button
                      onClick={() => this.props.onAddWanted(book)}
                      type="button"
                      className="btn btn-warning btn-sm"
                      disabled={
                        this.props.wantedBooks.find(e => e.id === book.id)
                          ? "disabled"
                          : null
                      }
                    >
                      <i className="fas fa-book" />
                    </button>
                    <button
                      onClick={() => this.props.onAddRead(book)}
                      type="button"
                      className="btn btn-warning btn-sm"
                      disabled={
                        this.props.readBooks.find(e => e.id === book.id)
                          ? "disabled"
                          : null
                      }
                    >
                      <i className="fas fa-archive" />
                    </button>
                    <button
                      onClick={() => this.props.onRemoveBook(book)}
                      type="button"
                      className="btn btn-danger btn-sm"
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      currentBooks,
      wantedBooks,
      readBooks
    } = this.props;

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
        {this.BookDialog(currentBooks)}
        <div className="row">
          <div className="col">
            <h4>Want to Read</h4>
          </div>
        </div>
        {this.BookDialog(wantedBooks)}
        <div className="row">
          <div className="col">
            <h4>Read</h4>
          </div>
        </div>
        {this.BookDialog(readBooks)}
      </div>
    );
  }
}
