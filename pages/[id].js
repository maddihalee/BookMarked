import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleBook } from '../api/promises';

function ViewBook() {
  const [viewBook, setViewBook] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleBook(id).then(setViewBook);
  }, [id]);

  console.warn(viewBook);

  return (
    <>
      <h1>{viewBook?.volumeInfo?.title}</h1>
      <p>{viewBook?.volumeInfo?.authors}</p>
      <p>{viewBook?.volumeInfo?.description}</p>
    </>
  );
}

export default ViewBook;
