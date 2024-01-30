import { useContext, useEffect, useMemo, useState } from 'react';
import SearchIcon from '../assets/search-icon.svg';
import { AppDataContext } from '../pages/Home';

const Search = () => {
  const {books,setBooks} = useContext(AppDataContext);
  const [searchText, setSearchText] = useState<string>('');
  const originalBooks = useMemo(() => {
    return books.map((book)=> book);
  }, [])

  useEffect(() => {
    if(searchText === '') {
      setBooks(originalBooks);
      return;
    };
    const searchedBooks = books.filter((book) => {
      return book.name.includes(searchText);
    });
    setBooks(searchedBooks);
  }, [searchText])

  function handleChange({target}:any) {
    setSearchText(target.value);
  };

  return (
    <div className='search-container'>
      <img id='search-button' src={SearchIcon} alt="Search button" />
      <input onChange={handleChange} type="search" id="search-input" value={searchText} placeholder='Pesquise seu arquivo aqui' />
    </div>
  )
}

export default Search