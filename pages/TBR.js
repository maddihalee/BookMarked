import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BookCard from '../components/BookCard';

export default function TBRPage() {
  const router = useRouter();
  const { book } = router.query;

  const [parsedBooks, setParsedBooks] = useState([]);

  useEffect(() => {
    // Retrieve the TBR books from local storage
    const savedTbrBooks = localStorage.getItem('tbrBooks');

    if (savedTbrBooks) {
      const parsedTbrBooks = JSON.parse(savedTbrBooks);
      setParsedBooks(parsedTbrBooks);
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(book)) {
      setParsedBooks(book.map((bookObj) => JSON.parse(bookObj)));
      localStorage.setItem('tbrBooks', JSON.stringify(book));
    } else if (book) {
      setParsedBooks([JSON.parse(book)]);
      localStorage.setItem('tbrBooks', JSON.stringify([book]));
    }
  }, [book]);

  return (
    <>
      {parsedBooks?.map((parsedBook) => (
        <BookCard bookObj={parsedBook} key={parsedBook.id} />
      ))}
    </>
  );
}
