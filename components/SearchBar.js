import PropTypes from 'prop-types';
import BookCard from './BookCard';

export default function SearchBar({ books, query, setQuery }) {
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredBooks = books.filter((book) => book.volumeInfo.title.toLowerCase().includes(query.toLowerCase()));
  console.warn(filteredBooks);
  return (
    <>
      {/* <form> */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search Books..."
      />
      {/* <button type="submit">Search</button>
      </form> */}
      <div className="filteredBooks">
        {filteredBooks?.map((filterBook) => (<BookCard bookObj={filterBook} />))}
      </div>
    </>
  );
}

SearchBar.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      authors: PropTypes.arrayOf,
      description: PropTypes.string,
    }),
  ),
  query: PropTypes.string,
  setQuery: PropTypes.func,
};

SearchBar.defaultProps = {
  books: [],
  query: '',
  setQuery: () => {},
};
