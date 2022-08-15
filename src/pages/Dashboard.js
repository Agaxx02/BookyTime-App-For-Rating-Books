import React, {
	useContext,
	useEffect,
	useState,
	useRef,
} from 'react';
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
	const [books, setBooks] = useState([]);
	const [currentBook, setCurrentBook] = useState(null);
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const search = async (isbn) => {
		let current = await searchISBN(isbn);
		setCurrentBook(current);
		console.log(current);
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
					search(isbnNumber);
				}}
			>
				<label htmlFor='ISBNNumber'>ISBN Number</label>
				<input
					id='ISBNNumber'
					onChange={(e) => {
						setIsbnNumber(e.target.value);
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
						<button className='button'>Add book</button>
					</div>
				)}
			</form>
			{message}
			<div></div>
		</div>
	);
}
