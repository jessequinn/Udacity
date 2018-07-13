import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "typeface-roboto";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#d7ffd9",
      main: "#a5d6a7",
      dark: "#75a478",
      contrastText: "#000000"
    },
    secondary: {
      light: "#ffff89",
      main: "#d4e157",
      dark: "#a0af22",
      contrastText: "#000000"
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
