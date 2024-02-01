import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import Books from '../components/Books'
import AddBookModal from '../components/BookModal';
import readingBookData from '../helper/readBookData';
import readingCategoriesData from '../helper/readCategoryData';

export type BookData = {
  id: number
  name: string
  source: string
  thumb: string
  categories: string[] 
  fixed: boolean
}

interface ContextTypes {
  categories: string[]
  books: BookData[] 
  originalBooksData: BookData[]
  setOriginalBooksData: (value:BookData[]) => void
  setCategories: (value:string[])=> void
  setBooks: (value:BookData[])=> void
}

export const AppDataContext = React.createContext<ContextTypes>({
  categories: [''],
  setCategories: () => {},
  books: [],
  setBooks: () => {},
  originalBooksData: [],
  setOriginalBooksData: () => {}
});

export const Home = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [originalBooksData, setOriginalBooksData] = useState<BookData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  useEffect(() => {
    async function loadingData() {
      const dataBooks = await readingBookData();
      const dataCategories = await readingCategoriesData();
      if(dataBooks) {
        setBooks(JSON.parse(dataBooks));
        setOriginalBooksData(JSON.parse(dataBooks));
      }
      if(dataCategories) {
        setCategories(JSON.parse(dataCategories));
      }
    }

    loadingData();
  },[])

  return (
    <AppDataContext.Provider value={{
      categories,
      setCategories,
      books,
      setBooks,
      originalBooksData,
      setOriginalBooksData
    }}>
      <div>
        <Header 
          setIsModalActive={setIsModalActive}
        />
        <Books 
          isModalActive={isModalActive}
        />
        {isModalActive && <AddBookModal setIsModalActive={setIsModalActive} />}
      </div>
    </AppDataContext.Provider>

  )
}
