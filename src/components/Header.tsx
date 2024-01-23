import SearchIcon from '../assets/search-icon.svg';
import AddButton from '../assets/add-button.svg';
import ImportIcon from '../assets/import-icon.svg';
import ExportIcon from '../assets/export-icon.svg';
import '../styles/Header.css';
import { useEffect, useState } from 'react';
import readingCategoriesData from '../helper/readCategoryData';

interface Header {
  setIsModalActive: (value:boolean) => void
}

export const Header = ({setIsModalActive}:Header) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    readingCategoriesData()
    .then((data) => {
      if(!data) return;
      setCategories(JSON.parse(data));
    })
  }, [])

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
          {
            categories.map((categ) => {

              return (
                <li>
                  {categ}
                </li>
              )
            })
          }
        </ul>
      </div>
      <ul className='options-menu-container'>
        <li onClick={() => setIsModalActive(true)}>
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
