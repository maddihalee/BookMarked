import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { getSingleBook } from '../api/promises';
// import useLocalStorage from '../utils/useLocalStorage';

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
      query: { book: JSON.stringify(viewBook) },
    });
  };

  const handleTbrToggle = (e) => {
    const isChecked = e.target.checked;
    setTbr(isChecked);
    addToTbr();
  };

  useEffect(() => {
    localStorage.setItem('tbrState', tbr ? 'true' : 'false');
  }, [tbr]);

  useEffect(() => {
    const savedTbrState = localStorage.getItem('tbrState');
    if (savedTbrState === 'true') {
      setTbr(true);
    }
  }, []);

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
        checked={tbr.tbr}
        onChange={handleTbrToggle}
      />
      <h1>{viewBook?.volumeInfo?.title}</h1>
      <p>{viewBook?.volumeInfo?.authors}</p>
      <p>{viewBook?.volumeInfo?.description}</p>
    </>
  );
}

export default ViewBook;
