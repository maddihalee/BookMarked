import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import {
  checkedBooks, removeBooks, saveBooks,
} from '../api/promises';
// import ReviewForm from '../components/ReviewForm';
import { useAuth } from '../utils/context/authContext';
// import ReviewBox from '../components/ReviewBox';

function ViewBook() {
  const [viewBook, setViewBook] = useState([]);
  // const [read, setRead] = useState(false);
  // const [reading, setReading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    checkedBooks(id, user.uid).then(setViewBook);
  }, []);

  const handleTbrToggle = () => {
    const savedBook = {
      bookId: viewBook.id,
      isReading: !viewBook.firebaseBook.isReading,
      uid: user.uid,
      bookTitle: viewBook.volumeInfo.title,
    };
    if (savedBook.isReading === true) {
      saveBooks(savedBook).then(router.push({ pathname: '/TBR' }));
    } else {
      removeBooks(savedBook).then(router.push({ pathname: '/' }));
    }
  };

  // const getBookReviews = () => getReviewsByBookId(viewBook.id).then();

  // console.warn(viewBook);

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
        checked={viewBook?.firebaseBook?.isReading}
        onChange={handleTbrToggle}
      />
      <h1>{viewBook?.volumeInfo?.title}</h1>
      <p>{viewBook?.volumeInfo?.authors}</p>
      <p>{viewBook?.volumeInfo?.description}</p>
      {/* <ReviewForm bookId={viewBook.id} onUpdate={getBookReviews} /> */}
    </>
  );
}

export default ViewBook;
