import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { getSingleBook } from '../api/promises';

function ViewBook() {
  const [viewBook, setViewBook] = useState([]);
  const [tbr, setTbr] = useState(false);
  // const [read, setRead] = useState(false);
  // const [reading, setReading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleBook(id).then(setViewBook);
  }, [id]);

  const addToTbr = () => {
    router.push({
      pathname: '/TBR',
      query: {
        book: JSON.stringify(viewBook),
        tbr: tbr ? 'true' : 'false',
      },
    });
    if (tbr) {
      // Add the book to TBR
      const savedTbrBooks = localStorage.getItem('tbrBooks');
      const parsedTbrBooks = savedTbrBooks ? JSON.parse(savedTbrBooks) : [];
      const updatedTbrBooks = [...parsedTbrBooks, viewBook];
      localStorage.setItem('tbrBooks', JSON.stringify(updatedTbrBooks));
    } else {
      // Remove the book from TBR
      const savedTbrBooks = localStorage.getItem('tbrBooks');
      if (savedTbrBooks) {
        const parsedTbrBooks = JSON.parse(savedTbrBooks);
        const updatedTbrBooks = parsedTbrBooks.filter((book) => book.id !== viewBook.id);
        localStorage.setItem('tbrBooks', JSON.stringify(updatedTbrBooks));
      }
    }
  };

  useEffect(() => {
    if (tbr) {
      addToTbr();
    }
  }, [tbr]);

  useEffect(() => {
    localStorage.setItem('tbrState', tbr ? 'true' : 'false');
  }, [tbr]);

  useEffect(() => {
    const savedTbrState = localStorage.getItem('tbrState');
    if (savedTbrState !== null && savedTbrState !== '') {
      setTbr(savedTbrState === 'true');
    }
  }, []);

  const handleTbrToggle = (e) => {
    const isChecked = e.target.checked;
    setTbr(isChecked);
  };

  console.warn(viewBook);

  return (
    <>
      <img
        src={viewBook?.volumeInfo?.imageLinks?.smallThumbnail}
        style={{
          height: '500px',
          width: '300px',
        }}
        alt=""
      />
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="tbr"
        name="tbr"
        label="TBR"
        checked={tbr}
        onChange={handleTbrToggle}
      />
      <h1>{viewBook?.volumeInfo?.title}</h1>
      <p>{viewBook?.volumeInfo?.authors}</p>
      <p>{viewBook?.volumeInfo?.description}</p>
    </>
  );
}

export default ViewBook;
