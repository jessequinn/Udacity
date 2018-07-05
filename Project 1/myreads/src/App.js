import _ from "lodash";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import * as BooksAPI from "./actions/books_api";
import ShelvedBooks from "./components/shelved_books";
import * as NoMatch from "./actions/404";
import SearchBooks from "./components/search_books";

class App extends Component {
  state = {
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

  isShelved = (id, response) => {
    let foundBook = false;
    for (let shelf in response) {
      if (shelf.indexOf(id) !== -1) {
        foundBook = true;
      }
    }
    return foundBook;
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
        this.removeBook(book, response);
      } else {
        this.moveBook(book, newShelf, response);
      }
    });
  };

  removeBook = (book, response) => {
    if (!this.isShelved(book.id, response)) {
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

  clearStates = () => {
    this.setState({
      searchResults: [],
      formattedResults: []
    });
  };

  updateSearchState = searchResults => {
    this.setState({
      searchResults
    });
  };

  updateFormattedState = formattedResults => {
    this.setState({
      formattedResults
    });
  };

  render() {
    return (
      <Switch>
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              shelvedBooks={this.state.shelvedBooks}
              searchResults={this.state.searchResults}
              formattedResults={this.state.formattedResults}
              onClearStates={this.clearStates}
              onUpdateSearchState={this.updateSearchState}
              onUpdateFormattedState={this.updateFormattedState}
              onChangeBookshelf={this.changeBookshelf}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ShelvedBooks
              shelvedBooks={this.state.shelvedBooks}
              onChangeBookshelf={this.changeBookshelf}
            />
          )}
        />
        <Route component={NoMatch.NotFound} />
      </Switch>
    );
  }
}

export default App;
