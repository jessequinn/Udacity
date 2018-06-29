import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp';

class Search extends Component {
  static propTypes = {
    books: propTypes.array.isRequired,
    onAddCurrent: propTypes.func.isRequired,
    currentBooks: propTypes.array.isRequired,
    onAddWanted: propTypes.func.isRequired,
    wantedBooks: propTypes.array.isRequired,
    onAddRead: propTypes.func.isRequired,
    readBooks: propTypes.array.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  clearQuery = () => {
    this.setState({ query: '' });
  };

  render() {
    const { books, onAddCurrent, onAddWanted, onAddRead, currentBooks, wantedBooks, readBooks } = this.props;
    const { query } = this.state;

    let showingBooks;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingBooks = books.filter(book => match.test(book.title));
    } else {
      showingBooks = [];
    }

    showingBooks.sort(sortBy('title'));

    // split array into chunks
    // const rows = _.chunk(showingBooks, 4)
    // console.log(rows)
    //
    //
    // <div className='dropup'>
    //   <button className='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
    //     <i className='fas fa-archive'></i>
    //   </button>
    //   <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
    //     <button onSelect={() => onAddCurrent(book)} className='dropdown-item'>Currently Reading</button>
    //     <button className='dropdown-item'>Want to Read</button>
    //     <button className='dropdown-item'>Read</button>
    //     <button className='dropdown-item'>None</button>
    //   </div>
    // </div>

    console.log(currentBooks);
    return (
      <div className='container'>
        <form>
          <div className='form-group row'>
            <div className='col-11'>
              <input
                className='form-control'
                type='text'
                placeholder='Search for your favourite book!'
                value={query}
                onChange={event => this.updateQuery(event.target.value)}
              />
            </div>
            <div className='col-1'>
              <Link to='/' className='btn btn-warning'>
                Return
              </Link>
            </div>
          </div>
        </form>
        <div className='row'>
          <div className='col'>
            <div className='card-columns'>
              {showingBooks.map(book => (
                <div className='card' key={book.id}>
                  <img
                    className='card-img-top'
                    src={book.imageLinks.smallThumbnail}
                    alt='Card image cap'
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>{book.title}</h5>
                    <h6 className='card-subtitle mb-2 text-muted'>
                      {book.subtitle}
                    </h6>
                    <p className='card-text'>{book.authors.join(', ')}</p>
                    <button
                      onClick={() => onAddCurrent(book)}
                      type='button'
                      className='btn btn-primary btn-sm'
                      disabled={
                        currentBooks.find(e => e.id === book.id)
                          ? 'disabled'
                          : null
                      }
                    >
                      <i className="fab fa-readme"></i>
                    </button>
                    <button
                      onClick={() => onAddWanted(book)}
                      type='button'
                      className='btn btn-warning btn-sm'
                      disabled={
                        wantedBooks.find(e => e.id === book.id)
                          ? 'disabled'
                          : null
                      }
                    >
                      <i className='fas fa-book' />
                    </button>
                    <button
                      onClick={() => onAddRead(book)}
                      type='button'
                      className='btn btn-dark btn-sm'
                      disabled={
                        readBooks.find(e => e.id === book.id)
                          ? 'disabled'
                          : null
                      }
                    >
                      <i className='fas fa-archive' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
