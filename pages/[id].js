import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  checkedBooks, removeBooks, saveBooks, getReviewsByBookId, updateBooks,
} from '../api/promises';
import ReviewForm from '../components/ReviewForm';
import { useAuth } from '../utils/context/authContext';
// import ReviewBox from '../components/ReviewBox';

function ViewBook({ onUpdate }) {
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
      firebaseKey: viewBook.firebaseBook.firebaseKey,
    };
    if (savedBook.isReading === true) {
      saveBooks(savedBook).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateBooks(patchPayload).then(() => {
          router.push({ pathname: '/TBR' });
        });
      });
    } else {
      removeBooks(viewBook.firebaseBook.firebaseKey).then(() => onUpdate()).then(router.push({ pathname: '/TBR' }));
    }
  };

  const getBookReviews = () => getReviewsByBookId(viewBook.id).then();

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
      <ReviewForm bookId={viewBook?.id} onUpdate={getBookReviews} />
    </>
  );
}

ViewBook.propTypes = {
  onUpdate: PropTypes.func,
};

ViewBook.defaultProps = {
  onUpdate: () => {},
};

export default ViewBook;
