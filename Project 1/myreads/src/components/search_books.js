import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../actions/books_api";

class SearchBooks extends Component {
  state = {
    term: "",
    searchResults: [],
    formattedResults: [],
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
      book.shelf = "none";
      this.setState(prevState => ({
        shelvedBooks: prevState.shelvedBooks.filter(b => b.id !== book.id),
        formattedResults: _.sortBy(
          prevState.formattedResults
            .filter(b => b.id !== book.id)
            .concat([book])
        )
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

  processQueryString = query => {
    return query
      .split(" ")
      .map(word => word.replace(/[^a-z\s]+/gi, ""))
      .join(" ")
      .replace(/[\s]+/gi, " ");
  };

  searchBooks = query => {
    if (query === "") {
      this.setState({ searchResults: [], formattedResults: [] });
    } else {
      BooksAPI.search(this.processQueryString(query)).then(searchResults => {
        if (
          !searchResults ||
          typeof searchResults === undefined ||
          searchResults.error === "empty query"
        ) {
          this.setState({
            searchResults: [],
            formattedResults: []
          });
        } else {
          this.setState({
            searchResults
          });

          // add shelf property and with none
          const formattedResults = _.map(searchResults, function(element) {
            return _.extend({}, element, { shelf: "none" });
          });

          this.setState({
            formattedResults
          });

          const newFormattedResults = this.state.formattedResults.filter(f => {
            return this.state.shelvedBooks.every(s => {
              return s.id !== f.id;
            });
          });

          this.setState({
            formattedResults: _.sortBy(
              _.concat(newFormattedResults, this.state.shelvedBooks)
            )
          });
        }
      });
    }
  };

  printBooks = books => {
    return (
      <div className="row">
        <div className="col">
          {!books.error && (
            <div className="card-columns">
              {books.map(book => (
                <div className="card" key={book.id}>
                  {book.imageLinks && (
                    <img
                      className="card-img-top"
                      src={book.imageLinks.smallThumbnail}
                      alt="Card cap"
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
                          this.changeBookshelf(book, "currentlyReading")
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
                        onClick={() => this.changeBookshelf(book, "wantToRead")}
                        type="button"
                        className="btn btn-warning btn-sm"
                        disabled={
                          book.shelf === "wantToRead" ? "disabled" : null
                        }
                      >
                        <i className="fas fa-book" title="Want to Read" />
                      </button>
                      <button
                        onClick={() => this.changeBookshelf(book, "read")}
                        type="button"
                        className="btn btn-warning btn-sm"
                        disabled={book.shelf === "read" ? "disabled" : null}
                      >
                        <i className="fas fa-archive" title="Read" />
                      </button>
                      <button
                        onClick={() => this.changeBookshelf(book, "none")}
                        type="button"
                        className="btn btn-danger btn-sm"
                        disabled={
                          !book.hasOwnProperty("shelf") || book.shelf === "none"
                            ? "disabled"
                            : null
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
  };

  search = _.debounce(query => {
    this.searchBooks(query);
  }, 300);

  render() {
    const { term, searchResults, formattedResults } = this.state;

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
        {this.printBooks(formattedResults ? formattedResults : searchResults)}
      </div>
    );
  }

  onInputChange(term) {
    this.setState({ term });
    this.search(term);
  }
}

export default SearchBooks;
