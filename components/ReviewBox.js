import PropTypes from 'prop-types';
// import Image from 'next/image';

export default function ReviewBox({ revObj }) {
  return (
    <div className="d-flex flex-column mb-2">
      <div className="d-flex flex-row">
        {/* <div><Image className="comment-avatar" src={revObj.user_photo} alt="" /></div> */}
        <div className="d-flex flex-column">
          <h6 className="comment-name by-author"><a href="http://creaticode.com/blog">{revObj?.userName}</a></h6>
          {revObj?.review}
        </div>
      </div>

    </div>
  );
}

ReviewBox.propTypes = {
  revObj: PropTypes.shape({
    userName: PropTypes.string,
    review: PropTypes.string,
    user_photo: PropTypes.string,
    bookId: PropTypes.string,
  }),
};

ReviewBox.defaultProps = {
  revObj: PropTypes.shape({
    userName: '',
    review: '',
  }),
};
