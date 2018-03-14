import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
  state = {}

  // Custom Methods
  onShelfChange = (book, shelf) => {
    this.props.updateBook(book, shelf)
  }

  render() {
    const { shelf, shelfBooks } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {shelf.name}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelfBooks.map((book) => (
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
