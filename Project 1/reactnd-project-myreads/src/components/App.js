import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Search from "../containers/search";
import * as BooksAPI from "../actions/books_api";

import MainContainer from "../containers/main_container";

export default class App extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  updateBooks = books => {
    this.setState(state => ({
      books: state.books
    }));
  }

  render() {
    return (
      <Switch>
        <Route
          path="/search"
          render={() => (
            <Search />
          )}
        />
        <Route
          path="/"
          render={() => (
            <div className="container">
              <MainContainer books={this.state.books} onUpdateBooks={this.updateBooks}/>
            </div>
          )}
        />
      </Switch>
    );
  }
}
