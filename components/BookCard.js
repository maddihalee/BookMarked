import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function BookCard({ bookObj }) {
  return (
    <>
      <Link href={`/${bookObj.id}`} passHref>
        <Card
          style={{
            height: '400px',
            width: '250px',
            margin: '10px',
            cursor: 'pointer',
            background: 'white',
          }}
          className="bookCard"
        >
          <Card.Img
            style={{
              height: '300px',
              width: '250px',
            }}
            variant="top"
            src={bookObj.volumeInfo.imageLinks.smallThumbnail}
          />
          <Card.Body>
            <Card.Title>{bookObj.volumeInfo.title}</Card.Title>
            <Card.Text>
              {bookObj.volumeInfo.authors}
            </Card.Text>
            <Link href="/TBR" passHref>
              <Button variant="primary">TBR</Button>
            </Link>
            <Link href="/currentlyReading" passHref>
              <Button variant="primary">Reading</Button>
            </Link>
            <Link href="/read" passHref>
              <Button variant="primary">Read</Button>
            </Link>
          </Card.Body>
        </Card>
      </Link>
    </>
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
