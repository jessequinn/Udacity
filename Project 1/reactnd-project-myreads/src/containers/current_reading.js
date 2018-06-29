import React, { Component } from 'react'
import propTypes from 'prop-types';

export default class CurrentReading extends Component {
  static propTypes = {
    onAddCurrent: propTypes.func.isRequired,
    currentBooks: propTypes.array.isRequired,
    onAddWanted: propTypes.func.isRequired,
    wantedBooks: propTypes.array.isRequired,
    onAddRead: propTypes.func.isRequired,
    readBooks: propTypes.array.isRequired
  }

  render() {
    const { onAddCurrent, onAddWanted, onAddRead, currentBooks, wantedBooks, readBooks } = this.props;

    return (
      <div className='container'>
        <div className='row'>
          <div className='col'><h4>Current Reading</h4></div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='card-columns'>
              {currentBooks.map(book => (
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
    )
  }
}
