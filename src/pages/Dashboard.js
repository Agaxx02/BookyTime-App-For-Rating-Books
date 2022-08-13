import React, {
	useContext,
	useEffect,
	useState,
	useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { handleErrors } from '../api/handleErrors';
import { updateBooks } from '../api/updateBooks';
import { getBooks } from '../api/getBooks';
import { useQuery } from '@tanstack/react-query';

export default function Dashboard() {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);

	const [isbn, setIsbn] = useState('');
	const [books, setBooks] = useState([]);
	const [currentBook, setCurrentBook] = useState(null);
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const fetchedBooks = useQuery(['fetchedBooks'], () => {
		getBooks(credentials);
	});
	useEffect(() => {
		console.log(fetchedBooks);
	}, []);

	const search = async (e) => {
		setError('');
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
					author: obj[`ISBN:${isbn}`]['authors'][0]['name'],
					cover: obj[`ISBN:${isbn}`]['cover']
						? obj[`ISBN:${isbn}`]['cover']['medium']
						: './No_cover.jpg',
					rate: null,
					read: false,
					comment: null,
					date: null,
				});
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	const checkForDuplicates = () => {
		setMessage('');
		if (books === undefined || books === null) {
			setBooks([currentBook], updateBooks(currentBook, credentials));
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
			<h1>Hello {credentials && credentials.username}!</h1>
			{error && <span className='errorMessage'>{error}</span>}
			<button className='button' onClick={library}>
				My Library
			</button>
			{credentials && (
				<button onClick={logout} className='button'>
					Logout
				</button>
			)}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					search();
				}}
			>
				<label htmlFor='ISBNNumber'>ISBN Number</label>
				<input
					id='ISBNNumber'
					onChange={(e) => {
						setIsbn(e.target.value);
						setMessage('');
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
						<button className='button' onClick={checkForDuplicates}>
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
