import React from 'react'
import FixIcon from '../assets/fix-icon.svg'
import EditIcon from '../assets/pencil-icon.svg'
import "../styles/Book.css"
import { Link } from 'react-router-dom'

const Book = () => {
  return (
    <>
      <a className='book-container'>
        <img className='book-image' src="" alt="Sem Capa" />
        <div className='book-edit-container'>
          <button>
            <img src={FixIcon}/>
          </button>
          <button>
            <img src={EditIcon}/>
          </button>
        </div>

      </a>
      <h2 className='book-name'>Livro 1</h2>
    </>
  )
}

export default Book