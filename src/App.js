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

			this.setState(books)
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
			<div className="app">
				<Route path="/" exact render={() => (
					<ListBooks
						books={this.state.books}
						updateBook={(book, shelf) => {
							this.updateBook(book, shelf)
						}} />
				)} />

				<Route path="/search" render={() => (
					<SearchBooks />
				)} />
			</div>
		)
	}
}

export default BooksApp
