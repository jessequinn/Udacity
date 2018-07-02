import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import * as BooksAPI from "../actions/books_api";

import Search from "../containers/search";
import MainContainer from "../containers/main_container";

export default class App extends Component {
  state = {
    booksShelved: []
  };

  componentDidMount() {
    this.fetchBooksFromAPI();
  }

  componentWillUnmount() {
    this.isCancelled = true;
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
          .filter(aBook => aBook.id !== book.id)
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

  render() {
    return (
      <Switch>
        <Route
          path="/search"
          render={() => (
            <Search
              onChangeBookshelf={(book, newShelf) => {
                this.changeBookshelf(book, newShelf);
              }}
              booksShelved={this.state.booksShelved}
              onFetchBooksFromAPI={this.fetchBooksFromAPI}
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
