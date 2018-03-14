import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  // Component State
  state = {
    books: [],
    query: ''
  }

  // Custom Methods
  clearQuery = () => {
    this.setState({
      books: [],
      query: ''
    })
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    })

    if (query.length) {
      BooksAPI.search(query).then((books) => {
        if (books.length) {
          this.setState({
            books: books
          })
        }
      })
    } else {
      this.clearQuery()
    }
  }

  onShelfChange = (book, shelf) => {
    this.props.updateBook(book, shelf)
  }

  render() {
    const { books, query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
              placeholder="Search by title or author" />
          </div>
          <button
            className="clear-query"
            onClick={() => this.clearQuery()}>
          </button>
        </div>
        <div className="search-books-results">

          {((query.length !== 0) && (
            <div className="showing-books">
              <h4>{books.length} books found</h4>
            </div>
          ))}

          <ol className="books-grid">
            {books.map((book) => (
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
    )
  }
}

export default SearchBooks
