import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleBook } from '../api/promises';
import BookCard from '../components/BookCard';

function ViewBook() {
  const [viewBook, setViewBook] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleBook(id).then(setViewBook);
  }, [id]);

  return (
    <BookCard bookObj={viewBook} />
  );
}

export default ViewBook;
