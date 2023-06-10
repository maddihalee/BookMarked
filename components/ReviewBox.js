import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getSingleReviews, updateReview } from '../api/promises';

export default function ReviewBox({ revObj, onUpdate }) {
  const { user } = useAuth();
  const { router } = useRouter();
  const [editReview, setEditReview] = useState();
  const { firebaseKey } = router.query;

  const handleClick = (e) => {
    const { name, value } = e.target;
    setEditReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (firebaseKey) {
      getSingleReviews(firebaseKey).then((updateReview(setEditReview)));
    }
  }, [firebaseKey]);

  return (
    <div className="d-flex flex-column mb-2">
      <div className="d-flex flex-row">
        <div><Image className="review-avatar" src={revObj.user_photo} alt="" width="50px" height="50px" /></div>
        <div className="d-flex flex-column">
          <h6 className="comment-name by-author"><a href="http://creaticode.com/blog">{revObj?.userName}</a></h6>
          {revObj?.review}
        </div>
        { user.uid === revObj.userId ? (
          <div className="text-right m-2" style={{ textAlign: 'right' }}>
            <Button type="submit" onClick={onUpdate} style={{ borderRadius: '30px', height: '40px', fontWeight: '600' }}>Edit Review</Button>
          </div>
        )
          : '' }
      </div>
      { editReview === true ? (
        <div className="d-flex flex-column" id="review-conainer" style={{ width: '1400px' }}>
          <Form onSubmit={handleClick} className="d-flex">
            <div className="d-flex" style={{ width: '1069px' }}>
              <Card.Img src={user?.photoURL} style={{ width: '50px', borderRadius: '100px' }} className="me-3 d-flex flex-column" />
              <Form.Control
                type="text"
                placeholder="Add a review..."
                name="review"
                value={editReview.review}
                onChange={handleClick}
                className="d-flex"
                required
              />
            </div>
            <div className="text-right m-2" style={{ textAlign: 'right' }}>
              <Button type="submit" onClick={onUpdate} style={{ borderRadius: '30px', height: '40px', fontWeight: '600' }}>Edit Review</Button>
            </div>
          </Form>
        </div>
      )
        : '' }
    </div>
  );
}

ReviewBox.propTypes = {
  revObj: PropTypes.shape({
    userName: PropTypes.string,
    review: PropTypes.string,
    user_photo: PropTypes.string,
    bookId: PropTypes.string,
    userId: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

ReviewBox.defaultProps = {
  revObj: PropTypes.shape({
    userName: '',
    review: '',
    userId: '',
  }),
  onUpdate: () => {},
};
