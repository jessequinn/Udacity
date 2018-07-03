import React, {Component} from 'react';
import PropTypes from "prop-types";

class BookList extends Component {
  static propTypes = {
    processedBooks: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
  };

  render() {
    const { processedBooks, onChangeBookShelf } = this.props;

     return (
       <div className="row">
         <div className="col">
           {!processedBooks.error && (
             <div className="card-columns">
               {processedBooks.map(book => (
                 <div className="card" key={book.id}>
                   {book.imageLinks && (
                     <img
                       className="card-img-top"
                       src={book.imageLinks.smallThumbnail}
                       alt="Card cap"
                     />
                   )}
                   <div className="card-body">
                     {book.title && (
                       <h5 className="card-title">{book.title}</h5>
                     )}
                     {book.subtitle && (
                       <h6 className="card-subtitle mb-2 text-muted">
                         {book.subtitle}
                       </h6>
                     )}
                     {book.authors && (
                       <p className="card-text">{book.authors.join(", ")}</p>
                     )}
                     <div
                       className="btn-group"
                       role="group"
                       aria-label="Basic example"
                     >
                       <button
                         onClick={() =>
                           onChangeBookShelf(book, "currentlyReading")
                         }
                         type="button"
                         className="btn btn-warning btn-sm"
                         disabled={
                           book.shelf === "currentlyReading"
                             ? "disabled"
                             : null
                         }
                       >
                         <i
                           className="fab fa-readme"
                           title="Currently Reading"
                         />
                       </button>
                       <button
                         onClick={() => onChangeBookShelf(book, "wantToRead")}
                         type="button"
                         className="btn btn-warning btn-sm"
                         disabled={
                           book.shelf === "wantToRead" ? "disabled" : null
                         }
                       >
                         <i className="fas fa-book" title="Want to Read" />
                       </button>
                       <button
                         onClick={() => onChangeBookShelf(book, "read")}
                         type="button"
                         className="btn btn-warning btn-sm"
                         disabled={book.shelf === "read" ? "disabled" : null}
                       >
                         <i className="fas fa-archive" title="Read" />
                       </button>
                       <button
                         onClick={() => onChangeBookShelf(book, "none")}
                         type="button"
                         className="btn btn-danger btn-sm"
                         disabled={
                           !book.hasOwnProperty("shelf") ? "disabled" : null
                         }
                       >
                         <i
                           className="fas fa-trash-alt"
                           title="Remove - None"
                         />
                       </button>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           )}
         </div>
       </div>
     );
  }
}

export default BookList;
