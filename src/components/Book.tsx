import FixIcon from '../assets/fix-icon.svg'
import EditIcon from '../assets/pencil-icon.svg'
import "../styles/Book.css"
import { AppDataContext, BookData } from '../pages/Home'
import { open } from '@tauri-apps/api/shell'
import { useContext, useEffect, useState } from 'react'
import { BaseDirectory, writeFile } from '@tauri-apps/api/fs'
import { bookDataPath } from '../helper/readBookData'
import AddBookModal from './BookModal'
import loadingImage from '../helper/loadingImage'

interface Book {
  data: BookData
}

const Book = ({data}:Book) => {
  const {books, setBooks} = useContext(AppDataContext);
  const [thumbUrl, setThumbUrl] = useState<string>('');
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  useEffect(() => {
    loadingImage(data).then(({imageUrl}) => setThumbUrl(imageUrl));
  },[]);

  async function fixArquive() {
    const fixedBookList= books.map((book) => {
      if(book.id !== data.id) return book;

      return {...book, fixed: !book.fixed}
    });
  
    await writeFile(bookDataPath, JSON.stringify(fixedBookList),{dir:BaseDirectory.AppData});
    setBooks(fixedBookList)
  };

  function openArquive() {
    open(data.source);
  };

  return (
    <>
      <li className='container'>
        <a onClick={openArquive} className='book-container'>
          <img className='book-image' src={thumbUrl} alt="Sem Capa" />
        </a>
        <div className='book-edit-container'>
            <button onClick={fixArquive} className={data.fixed ? 'fixed' : ''}>
              <img src={FixIcon}/>
            </button>
            <button onClick={() => setIsModalActive(true)}>
              <img src={EditIcon}/>
            </button>
          </div>
        <h2 className='book-name'>{data.name}</h2>
      </li>
      {isModalActive && <AddBookModal setIsModalActive={setIsModalActive} bookDataForEdit={data} />}
    </>
  )
}

export default Book