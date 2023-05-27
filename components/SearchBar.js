import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BookCard from './BookCard';
import getBooks from '../api/promises';

export default function SearchBar({ books, query, setQuery }) {
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredBooks = books.filter((book) => book.volumeInfo.title.toLowerCase().includes(query.toLowerCase()));

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setFilterBooks(filteredBooks);
  // };

  // useEffect(() => {
  //   getBooks(query).then((bookObject) => setBookObj(Object.values(bookObject)));
  // }, [query]);

  // useEffect(() => {
  //   filteredBooks
  // })

  console.warn(query);
  console.warn(books);

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
      <div>
        {filteredBooks?.map((filterBook) => (<BookCard bookObj={filterBook} />))}
      </div>
    </>
    // Call bookObj in book card component, bookObj.author, bookObj.title, etc. )}
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
