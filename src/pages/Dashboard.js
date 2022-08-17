import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { updateBooks } from '../api/updateBooks';
import { getBooks } from '../api/getBooks';
import { useQuery } from '@tanstack/react-query';
import { searchISBN } from '../api/searchISBN';

export default function Dashboard() {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);

	const [isbnNumber, setIsbnNumber] = useState(null);
	const [currentBook, setCurrentBook] = useState(null);
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const { data, status, error } = useQuery(['books'], () => {
		return getBooks(credentials);
	});

	const search = async (isbn) => {
		searchISBN(isbn).then((responseJSON) => {
			setCurrentBook(responseJSON);
		});
	};

	const addBook = () => {
		for (let i = 0; i < data.length; i++) {
			if (
				data[i].title === currentBook.title &&
				data[i].numOfPages === currentBook.numOfPages
			) {
				setMessage('Book already added');

				return;
			}
		}

		data.push(currentBook);
		updateBooks(data, credentials);
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
			<h1>Hello {credentials && credentials.username}!</h1>

			<button className='button' onClick={library}>
				My Library
			</button>
			{credentials ? (
				<button onClick={logout} className='button'>
					Logout
				</button>
			) : (
				{ logout }
			)}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					search(isbnNumber);
				}}
			>
				<label htmlFor='ISBNNumber'>ISBN Number</label>
				<input
					id='ISBNNumber'
					onChange={(e) => {
						setIsbnNumber(e.target.value);
						setMessage('');
						setCurrentBook(null);
					}}
				></input>
				<button className='button' type='submit'>
					Search
				</button>
				{currentBook && (
					<div className='searchResult'>
						<img src={currentBook.cover} alt='Book cover'></img>
						<h2>Title: {currentBook.title}</h2>
						<h3>Author: {currentBook.author}</h3>
						<button className='button' onClick={addBook}>
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
