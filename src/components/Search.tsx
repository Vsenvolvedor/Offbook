import SearchIcon from '../assets/search-icon.svg';

const Search = () => {
  return (
    <div className='search-container'>
      <img id='search-button' src={SearchIcon} alt="Search button" />
      <input type="search" name="" id="search-input" placeholder='Pesquise seu arquivo aqui' />
    </div>
  )
}

export default Search