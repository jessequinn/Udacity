import React from "react";
import { Link, Route } from "react-router-dom";

const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.status = code;
      return children;
    }}
  />
);

export const NotFound = () => (
  <Status code={404}>
    <div className="container">
      <div className="row">
        <div className="col-11">
          <h1>
            <strong>Page does not exist.</strong>
          </h1>
        </div>
        <div className="col-1">
          <Link to="/" className="btn btn-info">
            Return to Main Page
          </Link>
        </div>
      </div>
    </div>
  </Status>
);
