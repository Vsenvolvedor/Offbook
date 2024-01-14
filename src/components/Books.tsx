import React from 'react'
import Book from './Book'
import "../styles/Books.css";

interface BooksInterface {
  isModalActive: boolean
}

const Books = (props:BooksInterface) => {
  return (
    <ul className={`books-container ${props.isModalActive && "blur-background"}`}>
      <li>
        <Book />
      </li>
      <li>
        <Book />
      </li>
      
    </ul>
  )
}

export default Books