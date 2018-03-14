import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  // Component State
  state = {
    query: '',
    results: []
  }

  // Custom Methods
  clearQuery = () => {
    this.setState({
      query: '',
      results: []
    })
  }

  locateBook = (bookId) => {
    const find = this.props.books.filter((book) => book.id === bookId)
    return find.length ? find[0].shelf : 'none'
  }

  updateBook = (book, shelf) => {
    this.props.updateBook(book, shelf)
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    })

    if (query.length) {
      BooksAPI.search(query).then((results) => {
        if (results.length) {
          this.setState({
            results: results
          })
        }
      })
    } else {
      this.clearQuery()
    }
  }

  // Render Method
  render() {
    const { query, results } = this.state

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
              <h4>{results.length} books found</h4>
            </div>
          ))}

          <ol className="books-grid">
            {results.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  shelf={this.locateBook(book.id)}
                  updateBook={this.updateBook} />
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
