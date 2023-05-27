// import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { getBooks } from '../api/promises';
import SearchBar from '../components/SearchBar';
// import SearchResults from '../components/SearchResults';

function Home() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getBooks(query).then((data) => {
      setBooks(data);
    });
  }, [query]);

  // const filteredBooks = books.filter((book) => book.volumeInfo.title.toLowerCase().includes(query.toLowerCase()) || book.volumeInfo.authors.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <h1>Google Books Search</h1>
      <SearchBar books={books[2]} query={query} setQuery={setQuery} />
    </div>
  );
}

export default Home;
