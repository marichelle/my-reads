// Import Components
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

const shelves = [
  { id: 'currentlyReading', name: 'Currently Reading', show: true },
  { id: 'wantToRead', name: 'Want to Read', show: true },
  { id: 'read', name: 'Read', show: true },
  { id: 'none', name: 'None', show: false }
]

class ListBooks extends Component {
  // Component State
  state = {
    books: []
  }

  // Custom Methods
  updateBook = (book, shelf) => {
    // Update book in "database"
    BooksAPI.update(book, shelf).then((resp) => {
      const books = []
      const booksById = this.state.books.reduce((obj, item) => {
        obj[item.id] = item
        return obj
      }, {})

      // Update state
      for (const shelf of Object.entries(resp)) {
        for (const bookId of shelf[1]) {
          const newBookObj = booksById[bookId]

          newBookObj.shelf = shelf[0]
          books.push(newBookObj)
        }
      }

      this.setState({
        books: books
      })
    })
  }

  // Lifecycle Methods
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
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
              <BookShelf
                key={shelf.id}
                shelf={shelf}
                shelfBooks={this.state.books.filter((book) => book.shelf === shelf.id)}
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
