import { handleErrors } from './handleErrors';
import { BASE_URL } from '../api/config';

export const getBooks = async (credentials) => {
	let fetchedData = null;
	await fetch(`${BASE_URL}/library/getBooks`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${credentials.username}:${credentials.password}`,
		},
	})
		.then(handleErrors)
		.then((data) => {
			let obj = data;
			let books = obj.books;
			fetchedData = books;
		});

	return fetchedData;
};
