import { useRouter } from 'next/router';
import BookCard from '../components/BookCard';

export default function TBRPage() {
  const router = useRouter();
  const { book } = router.query;

  let parsedBooks = [];

  if (Array.isArray(book)) {
    parsedBooks = book.map((bookObj) => JSON.parse(bookObj));
  } else if (book) {
    parsedBooks = [JSON.parse(book)];
  }

  return (
    <>
      {parsedBooks.map((parsedBook) => (
        <BookCard bookObj={parsedBook} key={parsedBook.id} />
      ))}
    </>
  );
}
