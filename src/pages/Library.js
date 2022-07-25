import React, { useRef } from 'react';
import { useEffect, useContext, useState } from 'react';
import { CredentialsContext } from '../App';
import { handleErrors } from './Register';

export default function Library() {
	const [credentials] = useContext(CredentialsContext);
	const [books, setBooks] = useState([]);
	const [error, setError] = useState('');
	const useDidMountEffect = () => {
		const didMount = useRef(false);
		useEffect(() => {
			if (didMount.current) {
			} else {
				didMount.current = true;
				console.log(books, typeof books);
				if (
					books === undefined ||
					books === null ||
					books.length === 0
				) {
					fetch(`http://localhost:8000/books`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Basic ${credentials.username}:${credentials.password}`,
						},
					})
						.then(handleErrors)
						.then((data) => {
							let obj = data;
							setBooks(obj.books);
							console.log(obj);
						})
						.catch((error) => {
							setError(error.message);
						});
				}
			}
		}, [books]);
	};
	useDidMountEffect();

	const getBooks = () => {
		if (typeof books === null || typeof books === undefined) {
			setBooks([]);
		} else {
			return books;
		}
	};

	return (
		<div>
			<h1>Library</h1>
			<h3>My Books</h3>
			<section>
				{getBooks().map((book) => (
					<div key={book._id}>
						<h4>{book.title}</h4>
						<h4>{book.authors}</h4>
						<h4>{book.numOfPages}</h4>
					</div>
				))}
			</section>
		</div>
	);
}
