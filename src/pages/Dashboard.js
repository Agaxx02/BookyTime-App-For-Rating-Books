import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { updateBooks } from '../api/updateBooks';
import { getBooks } from '../api/getBooks';
import { searchISBN } from '../api/searchISBN';

export default function Dashboard() {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);
	const [books, setBooks] = useState(null);
	const [isbnNumber, setIsbnNumber] = useState(null);
	const [currentBook, setCurrentBook] = useState(null);
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData(credentials) {
			await getBooks(credentials).then((data) => {
				setBooks(data);
			});
		}
		fetchData(credentials);
	}, [credentials]);

	const search = async (isbn) => {
		if (isbn === null || isbn === '') {
			return;
		}
		searchISBN(isbn).then((responseJSON) => {
			setCurrentBook(responseJSON);
		});
	};

	const addBook = () => {
		if (books === undefined || books === null || books === []) {
			setBooks([currentBook], updateBooks(currentBook, credentials));
			setMessage('Book successfully added');
			return;
		}
		for (let i = 0; i < books.length; i++) {
			if (
				books[i].title === currentBook.title &&
				books[i].numOfPages === currentBook.numOfPages
			) {
				setMessage('Book already added');

				return;
			}
		}
		let copied = books;
		copied = [...copied, currentBook];
		setBooks(
			(oldBooks) => [...oldBooks, currentBook],
			updateBooks(copied, credentials)
		);
		setMessage('Book successfully added');
	};

	const library = () => {
		navigate('/library');
	};

	const logout = () => {
		setCredentials(null);

		navigate('/');
	};

	return (
		<div className='dashboard'>
			<h1 className='pageTitle'>
				Hello {credentials && credentials.username}!
			</h1>

			<button className='smallerButton' onClick={library}>
				My Library
			</button>
			<button onClick={logout} className='smallerButton'>
				Logout
			</button>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					search(isbnNumber);
				}}
			>
				<label htmlFor='ISBNNumber'>ISBN Number:</label>
				<input
					id='ISBNNumber'
					onChange={(e) => {
						setIsbnNumber(e.target.value);
						setMessage('');
						setCurrentBook(null);
					}}
				></input>
				<button className=' smallerButton' type='submit'>
					Search
				</button>
				{currentBook && (
					<div>
						<img
							className='img'
							src={currentBook.cover}
							alt='Book cover'
						></img>
						<h2>Title: {currentBook.title}</h2>
						<h3>Author: {currentBook.author}</h3>
						<button className=' smallerButton' onClick={addBook}>
							Add book
						</button>
					</div>
				)}
			</form>
			{message}
			<div></div>
		</div>
	);
}
