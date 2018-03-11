// Import Components
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

const shelves = [
  { id: 'currentlyReading', name: 'Currently Reading', show: true },
  { id: 'wantToRead', name: 'Want to Read', show: true },
  { id: 'read', name: 'Read', show: true },
  { id: 'none', name: 'None', show: false }
]

class ListBooks extends Component {
  // Component State
  state = {
  }

  // Custom Methods
  onShelfChange = (book, shelf) => {
    this.props.updateBook(book, shelf)
  }

  // Render Method
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf) => (shelf.show) && (
              <div className="bookshelf" key={shelf.id}>
                <h2 className="bookshelf-title">
                  {shelf.name}
                </h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.props.books
                      .filter((book) => book.shelf === shelf.id)
                      .map((book) => (
                        <li key={book.id}>
                          <Book book={book} onShelfChange={this.onShelfChange} />
                        </li>
                      )
                    )}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            Add a Book
          </Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
