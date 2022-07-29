import React, { useRef } from 'react';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { handleErrors } from './Register';

export default function Library() {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);
	const [books, setBooks] = useState([]);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const useDidMountEffect = () => {
		const didMount = useRef(true);
		useEffect(() => {
			if (didMount.current) {
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
			didMount.current = false;

			console.log(books, typeof books);
		});
	};
	useDidMountEffect((e) => {
		e.preventDefault();
	});

	const dashboard = () => {
		navigate('/dashboard');
	};
	const logout = () => {
		setCredentials(null);
		navigate('/');
	};
	const deleteBook = (index) => {
		books.splice(index, 1);
		setBooks([...books], updateBooks(books, credentials));
	};

	const updateBooks = async (books, credentials) => {
		fetch('http://localhost:8000/deleteBook', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${credentials.username}:${credentials.password}`,
			},
			body: JSON.stringify(books),
		});
		console.log(typeof books, books);
	};
	const finished = (index) => {
		books[index]['read'] = true;
		setBooks([...books], updateBooks(books, credentials));
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
					books.map((book, index) => {
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
										deleteBook(index);
									}}
								></img>
								<button
									onClick={(e) => {
										e.preventDefault();
										finished(index);
									}}
								>
									Finished
								</button>

								{book.read && <button>Rate Book</button>}
							</div>
						);
					})}
			</section>
		</div>
	);
}
