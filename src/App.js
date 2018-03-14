import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends Component {
  // Component State
  state = {
    books: []
  }

  // Custom Methods
  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  updateBook = (book, shelf) => {
    // Update book in "database"
    BooksAPI.update(book, shelf).then(this.getBooks)
  }

  // Lifecycle Methods
  componentDidMount() {
    this.getBooks()
  }

  // Render Method
  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <ListBooks
            books={books}
            updateBook={this.updateBook} />
        )} />

        <Route path="/search" render={() => (
          <SearchBooks
            books={books}
            updateBook={this.updateBook} />
        )} />
      </div>
    )
  }
}

export default BooksApp
