// Import Components
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

const shelves = [
  { id: 'currentlyReading', name: 'Currently Reading', show: true },
  { id: 'wantToRead', name: 'Want to Read', show: true },
  { id: 'read', name: 'Read', show: true },
  { id: 'none', name: 'None', show: false }
]

class ListBooks extends Component {
  state = {}

  // Custom Methods
  updateBook = (book, shelf) => {
    this.props.updateBook(book, shelf)
  }

  // Render Method
  render() {
    const { books } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf) => (shelf.show) && (
              <BookShelf
                key={shelf.id}
                shelf={shelf}
                shelfBooks={books.filter((book) => book.shelf === shelf.id)}
                updateBook={this.updateBook} />
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
