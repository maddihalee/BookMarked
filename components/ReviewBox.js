import PropTypes from 'prop-types';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import EditReviews from './EditReviewBox';

export default function ReviewBox({ revObj, onUpdate }) {
  const { user } = useAuth();
  const [showEditReviews, setShowEditReviews] = useState(false);

  const handleEditClick = () => {
    setShowEditReviews(true);
  };

  const anotherUpdate = () => {
    setShowEditReviews(false);
    onUpdate();
  };

  return (
    <div className="d-flex flex-column mb-2">
      <div className="d-flex flex-row">
        <div><Image className="review-avatar" src={revObj.user_photo} alt="" width="50px" height="50px" /></div>
        <div className="d-flex flex-column">
          <h6 className="comment-name by-author"><a href="http://creaticode.com/blog">{revObj?.userName}</a></h6>
          {revObj?.review}
        </div>
        { user.uid === revObj.userId && !showEditReviews ? (
          <div className="text-right m-2" style={{ textAlign: 'right' }}>
            <Button
              type="submit"
              onClick={handleEditClick}
              style={{ borderRadius: '30px', height: '40px', fontWeight: '600' }}
            >Edit Review
            </Button>
          </div>
        )
          : '' }
      </div>
      {showEditReviews ? <EditReviews revObj={revObj} onUpdate={anotherUpdate} /> : ''}
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
