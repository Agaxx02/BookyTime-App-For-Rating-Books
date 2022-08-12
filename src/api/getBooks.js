import { handleErrors } from './handleErrors';
import { BASE_URL } from '../api/config';

export const getBooks = async (credentials) => {
	await fetch(`${BASE_URL}/getBooks`, {
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
			return books;
		});
};
