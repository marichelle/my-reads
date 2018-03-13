import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
  // Custom Methods
  onShelfChange = (book, shelf) => {
    this.props.onShelfChange(book, shelf)
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {this.props.shelf.name}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books
              .filter((book) => book.shelf === this.props.shelf.id)
              .map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  onShelfChange={this.onShelfChange} />
              </li>
              )
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf
