import React from 'react'
import SearchIcon from '../assets/search-icon.svg';
import AddButton from '../assets/add-button.svg';
import ImportIcon from '../assets/import-icon.svg';
import ExportIcon from '../assets/export-icon.svg';
import '../styles/Header.css';

export const Header = () => {
  return (
    <header>
      <div className='search-container'>
        <img id='search-button' src={SearchIcon} alt="Search button" />
        <input type="search" name="" id="search-input" placeholder='Pesquise seu arquivo aqui' />
      </div>
      <div className='category-container'>
        <h1>
          Filtrar por categoria
        </h1>
        <ul>
          <li>
            categoria
          </li>
          <li>
            categoria
          </li>
          <li>
            categoria
          </li>
          <li>
            categoria
          </li>
        </ul>
      </div>
      <ul className='options-menu-container'>
        <li>
          <img src={AddButton} alt="" />
        </li>
        <li>
          <img src={ImportIcon} alt="" />
        </li>
        <li>
          <img src={ExportIcon} alt="" />
        </li>
      </ul>
    </header>
  )
}
