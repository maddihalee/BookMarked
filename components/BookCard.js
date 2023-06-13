import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleBook } from '../api/promises';

export default function BookCard({ bookObj, bookId }) {
  const [googleBook, setGoogleBook] = useState();

  useEffect(() => {
    if (bookObj.id) {
      setGoogleBook(bookObj);
    } else {
      getSingleBook(bookId).then(setGoogleBook);
    }
  }, []);

  return (
    <>
      <Link href={`/${googleBook?.id}`} passHref>
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
            src={googleBook?.volumeInfo?.imageLinks?.smallThumbnail}
          />
          <Card.Body>
            <Card.Title className="titleBook">{googleBook?.volumeInfo?.title}</Card.Title>
            <Card.Text>
              {googleBook?.volumeInfo?.authors?.[0]}
            </Card.Text>
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
      TBR: PropTypes.bool,
      read: PropTypes.bool,
      reading: PropTypes.bool,
      id: PropTypes.string,
    }),
  ),
  bookId: PropTypes.string,
};

BookCard.defaultProps = {
  bookObj: [],
  bookId: '',
};
