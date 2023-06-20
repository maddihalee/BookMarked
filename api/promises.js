import { clientCredentials } from '../utils/client';

const apiGoogleKey = clientCredentials.apiKey;

const dbUrl = 'https://www.googleapis.com/books/v1';
const firebaseUrl = 'https://bookmarked-a1bc9-default-rtdb.firebaseio.com';

const getBooks = (query) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/volumes/?q=${query}&key=${apiGoogleKey}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleBook = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/volumes/${id}?key=${apiGoogleKey}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const saveBooks = (payload) => new Promise((resolve, reject) => {
  fetch(`${firebaseUrl}/books.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateBooks = (payload) => new Promise((resolve, reject) => {
  fetch(`${firebaseUrl}/books/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(resolve)
    .catch(reject);
});

const getUserBooks = (uid) => new Promise((resolve, reject) => {
  fetch(`${firebaseUrl}/books.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getfirebaseBook = (bookId, uid) => new Promise((resolve, reject) => {
  fetch(`${firebaseUrl}/books.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const firebaseBook = Object.values(data).filter((item) => item.bookId === bookId);
      resolve(firebaseBook);
    })
    .catch(reject);
});

const removeBooks = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${firebaseUrl}/books/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const checkedBooks = (bookId, uid) => new Promise((resolve, reject) => {
  getSingleBook(bookId).then((googleBookObj) => getfirebaseBook(bookId, uid).then((firebaseBook) => {
    if (firebaseBook === 0) {
      resolve({ ...googleBookObj, firebaseBook: { isReading: false } });
    } else {
      resolve({ ...googleBookObj, firebaseBook: { ...firebaseBook[0] } });
    }
  }))
    .catch((error) => reject(error));
});

const createReview = (payload) => new Promise((resolve, reject) => {
  fetch(`${firebaseUrl}/reviews.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleReviews = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${firebaseUrl}/reviews/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateReview = (payload) => new Promise((resolve, reject) => {
  fetch(`${firebaseUrl}/reviews/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getReviewsByBookId = (bookId) => new Promise((resolve, reject) => {
  fetch(`${firebaseUrl}/reviews.json?orderBy="bookId"&equalTo="${bookId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getBooks, getSingleBook, saveBooks, removeBooks, getfirebaseBook, updateBooks, checkedBooks, getUserBooks, createReview, updateReview, getReviewsByBookId, getSingleReviews,
};
