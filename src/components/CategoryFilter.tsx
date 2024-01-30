import { useContext, useMemo, useRef } from 'react'
import { AppDataContext } from '../pages/Home'
import '../styles/Header.css';

interface CategoryFilter {
  category: string
}

const CategoryFilter = ({category}:CategoryFilter) => {
  const {books,setBooks, originalBooksData} = useContext(AppDataContext);
  const categRef = useRef<HTMLLIElement | null>(null);

  function filterByCategory() {
    if(categRef.current?.classList.contains('categ-active')) {
      categRef.current?.classList.remove('categ-active');
      setBooks(originalBooksData);
      return;
    };
    const filteredList = books.filter((book) => {
      const hasCategory = book.categories.reduce<boolean>((acc, categ) => {
        if(categ === category || acc) {
          acc = true;
          return true;
        } else {
          acc = false;
          return false;
        }
      }, false)
      
      return hasCategory;
    });
    categRef.current?.classList.add('categ-active')
    setBooks(filteredList);
  }

  return (
    <li onClick={filterByCategory} ref={categRef}>
      {category}
    </li>
  )
}

export default CategoryFilter