import _ from "lodash";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import * as BooksAPI from "../actions/books_api";

import test from "../containers/test.js";
import Search from "../containers/search";
import MainContainer from "../containers/main_container";

export default class App extends Component {
  state = {
    booksShelved: [],
    searchResults: []
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
    this.processedSearchResults()
  }

  processedSearchResults() {
    const bookIds = _.map(this.state.searchResults, 'id');
    const processedBookIds = _.differenceWith(this.state.booksShelved, bookIds);
    const removedBookIds = _.map(this.state.booksShelved, 'id');
    const newArray = _.remove(this.state.searchResults, obj => removedBookIds.indexOf(obj.id) > -1);
    console.log(newArray);
  }

  render() {
    const searchBooks = _.debounce((query) => { this.searchBooks(query) }, 2000);

    return (
      <Switch>
        <Route path="/test" component={test} />
        <Route
          path="/search"
          render={() => (
            <Search
              onChangeBookshelf={(book, newShelf) => {
                this.changeBookshelf(book, newShelf);
              }}
              booksShelved={this.state.booksShelved}
              onSearchBooks={searchBooks}
              searchResults={this.state.searchResults}
            />
          )}
        />
        <Route
          path="/"
          render={() => (
            <MainContainer
              booksShelved={this.state.booksShelved}
              onChangeBookshelf={(book, newShelf) => {
                this.changeBookshelf(book, newShelf);
              }}
            />
          )}
        />
      </Switch>
    );
  }
}
