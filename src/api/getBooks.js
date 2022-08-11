import { handleErrors } from './handleErrors';

export const getBooks = async () => {
	fetch(`${BASE_URL}/getBooks`, {
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
		})
		.catch((error) => {
			setError(error.message);
		});
};
