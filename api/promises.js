import { clientCredentials } from '../utils/client';

const apiGoogleKey = clientCredentials.apiKey;

const dbUrl = 'https://www.googleapis.com/books/v1';

// const bookFinderUrl = clientCredentials.bookFinderUrl

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
  fetch(`${dbUrl}/volumes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getBooks, getSingleBook };
