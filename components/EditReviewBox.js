import { Form, Button, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getSingleReviews, updateReview } from '../api/promises';

export default function EditReviews({ onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();
  const [editReview, setEditReview] = useState();
  const { firebaseKey } = router.query;

  const handleClick = (e) => {
    e.preventDefault();
    updateReview(firebaseKey, editReview).then(() => {
      onUpdate();
    });
  };

  useEffect(() => {
    if (firebaseKey) {
      getSingleReviews(firebaseKey).then((review) => setEditReview(review));
    }
  }, [firebaseKey]);

  return (
    <div className="d-flex flex-column" id="review-conainer" style={{ width: '1400px' }}>
      <Form onSubmit={handleClick} className="d-flex">
        <div className="d-flex" style={{ width: '1069px' }}>
          <Card.Img src={user?.photoURL} style={{ width: '50px', borderRadius: '100px' }} className="me-3 d-flex flex-column" />
          <Form.Control
            type="text"
            placeholder="Update your review..."
            name="review"
            value={editReview?.review}
            onChange={(e) => {
              const { name, value } = e.target;
              setEditReview((prevState) => ({
                ...prevState,
                [name]: value,
              }));
            }}
            className="d-flex"
            required
          />
        </div>
        <div className="text-right m-2" style={{ textAlign: 'right' }}>
          <Button type="submit" onClick={onUpdate} style={{ borderRadius: '30px', height: '40px', fontWeight: '600' }}>Edit Review</Button>
        </div>
      </Form>
    </div>
  );
}

EditReviews.propTypes = {
  onUpdate: PropTypes.func,
};

EditReviews.defaultProps = {
  onUpdate: () => {},
};
