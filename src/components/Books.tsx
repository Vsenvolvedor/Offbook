import React from 'react'
import Book from './Book'
import "../styles/Books.css";

const Books = () => {
  return (
    <ul className='books-container'>
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