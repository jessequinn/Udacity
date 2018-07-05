import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "../actions/books_api";

class SearchBooks extends Component {
  static propTypes = {
    searchResults: PropTypes.array.isRequired,
    formattedResults: PropTypes.array.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired,
    onClearStates: PropTypes.func.isRequired,
    onUpdateSearchState: PropTypes.func.isRequired,
    onUpdateFormattedState: PropTypes.func.isRequired,
    shelvedBooks: PropTypes.array.isRequired
  };

  state = {
    term: ""
  };

  constructor(props) {
    super(props);
    props.onClearStates();
  }

  processQueryString = query => {
    return query
      .split(" ")
      .map(word => word.replace(/[^a-z\s]+/gi, ""))
      .join(" ")
      .replace(/[\s]+/gi, " ");
  };

  searchBooks = query => {
    const { shelvedBooks } = this.props;

    if (query === "") {
      this.props.onClearStates();
    } else {
      BooksAPI.search(this.processQueryString(query)).then(searchResults => {
        if (
          !searchResults ||
          typeof searchResults === undefined ||
          searchResults.error === "empty query"
        ) {
          this.props.onClearStates();
        } else {
          this.props.onUpdateSearchState(searchResults);

          // add shelf property and with none
          const formattedResults = _.map(searchResults, function(element) {
            return _.extend({}, element, { shelf: "none" });
          });

          this.props.onUpdateFormattedState(formattedResults);

          const newFormattedResults = this.props.formattedResults.filter(f => {
            return shelvedBooks.every(s => {
              return s.id !== f.id;
            });
          });

          this.props.onUpdateFormattedState(
            _.sortBy(_.concat(newFormattedResults, shelvedBooks))
          );
        }
      });
    }
  };

  printBooks = books => {
    const { onChangeBookshelf } = this.props;

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

  // change time for debouncer
  search = _.debounce(query => {
    this.searchBooks(query);
  }, 300);

  render() {
    const { term } = this.state;
    const { searchResults, formattedResults } = this.props;

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
