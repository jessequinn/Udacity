import _ from "lodash";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import * as BooksAPI from "../actions/books_api";

import SearchBar from "../components/search_bar";
import BookList from "../components/book_list";
import MainContainer from "../containers/main_container";

export default class App extends Component {
  state = {
    booksShelved: [],
    searchResults: [],
    processedBooks: []
  };

  componentDidMount() {
    this.fetchBooksFromAPI();
  }

  fetchBooksFromAPI() {
    BooksAPI.getAll().then(booksShelved => {
      this.setState({ booksShelved });
    });
  }

  isInDB(id, response) {
    let foundBook = false;
    for (let shelf in response) {
      if (shelf.indexOf(id) !== -1) {
        foundBook = true;
      }
    }
    return foundBook;
  }

  deleteBook(book, response) {
    if (!this.isInDB(book.id, response)) {
      this.setState(prevState => ({
        booksShelved: prevState.booksShelved.filter(b => b.id !== book.id)
      }));
      this.processedSearchResults();
    }
  }

  moveBook(book, newShelf, response) {
    if (response[newShelf].indexOf(book.id) !== -1) {
      book.shelf = newShelf;
      this.setState(prevState => ({
        booksShelved: prevState.booksShelved
          .filter(b => b.id !== book.id)
          .concat([book])
      }));
    }
  }

  changeBookshelf(book, newShelf) {
    BooksAPI.update(book, newShelf).then(response => {
      if (newShelf === "none") {
        this.deleteBook(book, response);
      } else {
        this.moveBook(book, newShelf, response);
      }
    });
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
    this.processedSearchResults();
  }

  processedSearchResults() {
    let processedBooks = this.state.searchResults;
    console.log(processedBooks);
    if (_.isEmpty(this.state.booksShelved)) {
      _.remove(processedBooks, obj => _.map(this.state.booksShelved, "id").includes(obj.id));
    }

    if (processedBooks.error) {
      this.setState({
        processedBooks: []
      });
    } else {
      this.setState({
        processedBooks: _.concat(processedBooks, this.state.booksShelved)
      });
    }
  }

  render() {
    const searchBooks = _.debounce(query => {
      this.searchBooks(query);
    }, 300);

    return (
      <Switch>
        <Route
          path="/search"
          render={() => (
            <div className="container">
              <SearchBar onSearchTermChange={searchBooks} />
              <BookList
                processedBooks={this.state.processedBooks}
                onChangeBookShelf={(book, newShelf) => {
                  this.changeBookshelf(book, newShelf);
                }}
              />
            </div>
          )}
        />
        <Route
          path="/"
          render={() => (
            <MainContainer
              booksShelved={this.state.booksShelved}
              onChangeBookShelf={(book, newShelf) => {
                this.changeBookshelf(book, newShelf);
              }}
            />
          )}
        />
      </Switch>
    );
  }
}
