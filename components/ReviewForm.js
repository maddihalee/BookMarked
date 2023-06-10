import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import ReviewBox from './ReviewBox';
import { getReviewsByBookId, updateReview, createReview } from '../api/promises';

const initialState = '';

export default function ReviewForm({ bookId, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const [reviews, setReviews] = useState();

  const getReviews = () => {
    getReviewsByBookId(bookId).then((data) => {
      setReviews(data);
    });
  };

  useEffect(() => {
    getReviews();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      userName: user.displayName,
      user_photo: user.photoURL,
      bookId,
      userId: user.uid,
    };
    createReview(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateReview(patchPayload).then(() => {
        setFormInput(initialState);
      });
    });
    getReviewsByBookId(bookId).then(setReviews);
  };

  return (
    <>
      { user ? (
        <>
          <div className="d-flex flex-column" id="review-conainer" style={{ width: '1400px' }}>
            <Form onSubmit={handleSubmit} className="d-flex">
              <div className="d-flex" style={{ width: '1069px' }}>
                <Card.Img src={user?.photoURL} style={{ width: '50px', borderRadius: '100px' }} className="me-3 d-flex flex-column" />
                <Form.Control
                  type="text"
                  placeholder="Add a review..."
                  name="review"
                  value={formInput.review}
                  onChange={handleChange}
                  className="d-flex"
                  required
                />
              </div>
              <div className="text-right m-2" style={{ textAlign: 'right' }}>
                <Button type="submit" onClick={onUpdate} style={{ borderRadius: '30px', height: '40px', fontWeight: '600' }}>Review</Button>
              </div>
            </Form>
          </div>
          <div className="list-reviews">
            {reviews?.map((review) => <ReviewBox onUpdate={getReviews} revObj={review} bookId={review.id} />)}
          </div>
        </>
      ) : (
        <div className="list-reviews">
          {reviews?.map((review) => <ReviewBox revObj={review} bookId={review.id} />)}
        </div>
      )}
    </>
  );
}

ReviewForm.propTypes = {
  bookId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
