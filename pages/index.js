// import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { useEffect, useState } from 'react';
import getBooks from '../api/promises';
import SearchBar from '../components/SearchBar';
// import SearchResults from '../components/SearchResults';

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then((data) => {
      setBooks(data);
    });
  }, []);

  // const filteredBooks = books.filter((book) => book.volumeInfo.title.toLowerCase().includes(query.toLowerCase()) || book.volumeInfo.authors.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <h1>Google Books Search</h1>
      <SearchBar books={books[2]} />
    </div>
  );
}

export default Home;
