import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class SearchBar extends Component {
  static propTypes = {
    onSearchTermChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = { term: "" };
  }

  componentDidMount() {
    this.setState({ term: "" });
  }

  render() {
    console.log(this.state.term);
    return (
      <div className="container">
        <form>
          <div className="form-group row">
            <div className="col-11">
              <input
                className="form-control"
                type="text"
                placeholder="Search for your favourite book!"
                value={this.state.term}
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
      </div>
    );
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
