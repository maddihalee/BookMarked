import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function BookCard({ bookObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={bookObj.volumeInfo.imageLinks.thumbnail} />
      <Card.Body>
        <Card.Title>{bookObj.volumeInfo.title}</Card.Title>
        <Card.Text>
          {bookObj.volumeInfo.authors}
          {bookObj.volumeInfo.description}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

BookCard.propTypes = {
  bookObj: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      authors: PropTypes.arrayOf,
      description: PropTypes.string,
      imageLinks: PropTypes.obj,
    }),
  ),
};

BookCard.defaultProps = {
  bookObj: [],
};
