// import _ from "lodash";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// import * as BooksAPI from "./actions/books_api";
//
import ShelvedBooks from "./components/shelved_books";
import * as NoMatch from "./actions/404";
import SearchBooks from "./components/search_books";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/search"
          render={() => (
            <div className="container">
              <SearchBooks />
            </div>
          )}
        />
        <Route exact path="/" component={ShelvedBooks} />
        <Route component={NoMatch.NotFound} />
      </Switch>
    );
  }
}

export default App;
