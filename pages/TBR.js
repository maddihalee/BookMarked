import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { getUserBooks } from '../api/promises';
import { useAuth } from '../utils/context/authContext';

export default function TBRPage() {
  // const router = useRouter();
  const { user } = useAuth();

  const [parseBooks, setParseBooks] = useState([]);

  const getUidBooks = () => {
    getUserBooks(user.uid).then(setParseBooks);
  };

  useEffect(() => {
    getUidBooks();
  }, []);

  return (
    <>
      {parseBooks?.map((parseBook) => (
        <BookCard bookObj={parseBook} key={parseBook.id} onUpdate={getUidBooks} bookId={parseBook.bookId} />
      ))}
    </>
  );
}
