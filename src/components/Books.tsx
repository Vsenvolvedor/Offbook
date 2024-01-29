import { useContext, useMemo } from 'react'
import Book from './Book'
import "../styles/Books.css";
import { AppDataContext, BookData } from '../pages/Home';

interface BooksInterface {
  isModalActive: boolean
}

const Books = (props:BooksInterface) => {
  const {books} = useContext(AppDataContext);
  const classifiedBooks = useMemo<BookData[]>(() => {
    const newList:BookData[] = [];
    books.forEach((book) => {
      if(book.fixed) {
        newList.unshift(book);
      } else {
        newList.push(book);
      }
    })
    return newList;
  }, [books]);

  return (
    <ul className={`books-container ${props.isModalActive && "blur-background"}`}>
      {
        classifiedBooks.map((book) => {
          return (
            <Book key={book.id} data={book} />
          )
        })
      }
    </ul>

  )
}

export default Books