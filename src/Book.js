import React, { Component } from 'react'

class Book extends Component {
  // Render Method
  render() {
    const { book, shelf, updateBook } = this.props
    const { title, authors, imageLinks } = this.props.book
    // fallback thumbnail
    const thumbnail = imageLinks !== undefined ? imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No+Image+Found'

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ thumbnail })` }}></div>
          <div className="book-shelf-changer">
            <select
              value={shelf}
              onChange={(event) => updateBook(
                book,
                event.target.value
              )}>
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{ title }</div>
        {(authors !== undefined) && (
          <div className="book-authors">{ authors.join(', ') }</div>
        )}
      </div>
    )
  }
}

export default Book
