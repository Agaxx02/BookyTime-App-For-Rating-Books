import { BASE_URL } from './config';

export const updateBooks = (books, credentials) => {
	fetch(`${BASE_URL}/addBooks`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${credentials.username}:${credentials.password}`,
		},
		body: JSON.stringify(books),
	});
};
