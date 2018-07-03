import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../actions/books_api";
import * as ListShelvedBooks from "../actions/list_shelved_books";

class ShelvedBooks extends Component {
  state = {
    shelvedBooks: []
  };

  componentDidMount() {
    this.fetchBooksFromAPI();
  }

  fetchBooksFromAPI() {
    BooksAPI.getAll().then(shelvedBooks => {
      this.setState({ shelvedBooks });
    });
  }

  isInDB = (id, response) => {
    let foundBook = false;
    for (let shelf in response) {
      if (shelf.indexOf(id) !== -1) {
        foundBook = true;
      }
    }
    return foundBook;
  };

  deleteBook = (book, response) => {
    if (!this.isInDB(book.id, response)) {
      this.setState(prevState => ({
        shelvedBooks: prevState.shelvedBooks.filter(b => b.id !== book.id)
      }));
    }
  };

  moveBook = (book, newShelf, response) => {
    if (response[newShelf].indexOf(book.id) !== -1) {
      book.shelf = newShelf;
      this.setState(prevState => ({
        shelvedBooks: prevState.shelvedBooks
          .filter(b => b.id !== book.id)
          .concat([book])
      }));
    }
  };

  changeBookshelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(response => {
      if (newShelf === "none") {
        this.deleteBook(book, response);
      } else {
        this.moveBook(book, newShelf, response);
      }
    });
  };

  render() {
    const { shelvedBooks } = this.state;

    // prints token passed to book API
    // console.log(localStorage.token);

    // request an update just incase shelvedBooks is missing books
    // this.fetchBooksFromAPI();

    // prints state of shelvedBooks
    // console.log(shelvedBooks);

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
                this.changeBookshelf,
                shelvedBooks,
                "currentlyReading"
              )
            : null}
        </div>
        <div className="row">
          {shelvedBooks
            ? ListShelvedBooks.listShelvedBooks(
                this.changeBookshelf,
                shelvedBooks,
                "wantToRead"
              )
            : null}
        </div>
        <div className="row">
          {shelvedBooks
            ? ListShelvedBooks.listShelvedBooks(
                this.changeBookshelf,
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
