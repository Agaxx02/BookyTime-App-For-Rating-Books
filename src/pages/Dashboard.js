import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { handleErrors } from './Register';
import { v4 as uuidv4 } from 'uuid';

export default function Dashboard() {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);
	const [isbn, setIsbn] = useState('');
	const [currentBook, setCurrentBook] = useState(null);
	const [books, setBooks] = useState([]);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		console.log(books, typeof books);
		if (books == []) {
			fetch(`http://localhost:8000/books`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Basic ${credentials.username}:${credentials.password}`,
				},
			})
				.then((response) => {
					response.json();
				})
				.then((books) => {
					setBooks(books);
				});
		}else{
			persist(books);
			
		}
	}, [books]);

	const search = async (e) => {
		setError('');
		e.preventDefault();
		await fetch(
			`https://api.allorigins.win/get?url=${encodeURIComponent(
				`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
			)}`
		)
			.then(handleErrors)
			.then((data) => {
				let obj = data.contents;
				obj = JSON.parse(obj);
				setCurrentBook({
					title: obj[`ISBN:${isbn}`]['title'],
					numOfPages: obj[`ISBN:${isbn}`]['number_of_pages'],
					authors: obj[`ISBN:${isbn}`]['authors'][0]['name'],
					id: uuidv4(),
				});
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	const persist = (books) => {
		fetch('http://localhost:8000/books', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${credentials.username}:${credentials.password}`,
			},
			body: JSON.stringify(books),
		});
	};

	const checkForDuplicates = () => {
		for (let i = 0; i < books.length; i++) {
			if (
				books[i].title === currentBook.title &&
				books[i].numOfPages === currentBook.numOfPages
			) {
				setError('Book already added');
				return;
			}
		}
		setBooks((oldBooks) => [...oldBooks, currentBook]);
	};

	const getBooks = () => {
		fetch(`http://localhost:8000/books`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${credentials.username}:${credentials.password}`,
			},
		})
			.then((response) => {
				response.json();
			})
			.then((books) => {
				setBooks(books);
			});
	};

	const library = () => {
		navigate('/library');
	};

	return (
		<div>
			<h1>Welcome {credentials && credentials.username}</h1>
			{error && <span className='errorMessage'>{error}</span>}
			<form onSubmit={search}>
				<label htmlFor='ISBNNumber'>ISBN Number</label>
				<input
					id='ISBNNumber'
					onChange={(e) => setIsbn(e.target.value)}
				></input>
				<button type='submit'>Search</button>
				{currentBook && (
					<div className='searchResult'>
						<h2>Title: {currentBook.title}</h2>
						<h3>Author: {currentBook.authors}</h3>
						<button onClick={checkForDuplicates}>Add book</button>
					</div>
				)}
				<button onClick={library}>My Library</button>
			</form>
			<div></div>
		</div>
	);
}
