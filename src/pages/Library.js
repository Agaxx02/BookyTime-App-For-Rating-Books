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
	useDidMountEffect((e) => {
		e.preventDefault();
	});

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
		setBooks([copied]);
		persist(copied, credentials);
		console.log(books, copied);
	};

	return (
		<div>
			<h1>Your library</h1>
			{credentials && <button onClick={logout}>Logout</button>}
			<button onClick={dashboard}>Search books</button>
			<section>
				{getBooks().map((book) => (
					<div key={book._id}>
						<img src={book.cover} alt='Book cover'></img>
						<h4>{book.title}</h4>
						<h4>{book.author}</h4>
						<h4>{book.numOfPages}</h4>
						<img
							onClick={(e) => {
								e.preventDefault();
								deleteBook(book._id);
							}}
							src='./icons8-delete-24.png'
							alt='delete icon'
						></img>
					</div>
				))}
			</section>
		</div>
	);
}
