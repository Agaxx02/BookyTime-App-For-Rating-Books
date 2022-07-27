import React, { useRef } from 'react';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { handleErrors } from './Register';
import { persist } from './Dashboard';

export default function Library() {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);
	const [books, setBooks] = useState([]);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		if (books === undefined || books === null || books.length === 0) {
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
	}, [books]);

	const dashboard = () => {
		navigate('/dashboard');
	};
	const logout = () => {
		setCredentials(null);
		navigate('/');
	};
	const deleteBook = (id) => {
		let bookIndex;
		let copied = books;
		copied.forEach((book, index) => {
			if (book._id === id) {
				bookIndex = index;
			}
		});
		copied.splice(bookIndex, 1);

		setBooks(copied);
	};

	return (
		<div>
			<h1>Your library</h1>
			{credentials && (
				<button
					onClick={(e) => {
						e.preventDefault();
						logout();
					}}
				>
					Logout
				</button>
			)}
			<button
				onClick={(e) => {
					e.preventDefault();
					dashboard();
				}}
			>
				Search books
			</button>
			<section>
				{books &&
					books.map((book) => {
						return (
							<div key={book._id}>
								<img src={book.cover} alt='Book cover'></img>
								<h4>{book.title}</h4>
								<h4>{book.author}</h4>
								<h4>{book.numOfPages}</h4>
								<img
									alt='delete book'
									src='./icons8-delete-24.png'
									onClick={() => {
										deleteBook(book._id);
									}}
								></img>
							</div>
						);
					})}
			</section>
		</div>
	);
}
