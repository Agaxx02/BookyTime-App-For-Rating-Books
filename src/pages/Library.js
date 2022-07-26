import React, { useRef } from 'react';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { handleErrors } from './Register';

export default function Library() {
	const [credentials] = useContext(CredentialsContext);
	const [books, setBooks] = useState([]);
	const [error, setError] = useState('');
	const navigate = useNavigate();
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
		if (books === null || books === undefined) {
			setBooks([]);
		} else {
			return books;
		}
	};
	const dashboard = () => {
		navigate('/dashboard');
	};

	return (
		<div>
			<h1>Your library</h1>
			<button onClick={dashboard}>Search books</button>
			<section>
				{getBooks().map((book) => (
					<div key={book._id}>
						<img src={book.cover} alt='Book cover'></img>
						<h4>{book.title}</h4>
						<h4>{book.author}</h4>
						<h4>{book.numOfPages}</h4>
					</div>
				))}
			</section>
		</div>
	);
}
