import React, {
	useContext,
	useEffect,
	useState,
	useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { handleErrors } from './Register';

export const persist = (books, credentials) => {
	fetch('http://localhost:8000/books', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${credentials.username}:${credentials.password}`,
		},
		body: JSON.stringify(books),
	});
};

export default function Dashboard() {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);
	const [isbn, setIsbn] = useState('');
	const [currentBook, setCurrentBook] = useState(null);
	const [books, setBooks] = useState([]);
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const useDidMountEffect = () => {
		const didMount = useRef(false);
		useEffect(() => {
			if (didMount.current) {
				persist(books, credentials);
				console.log('books changed');
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
				console.log(obj);

				setCurrentBook({
					title: obj[`ISBN:${isbn}`]['title'],
					numOfPages: obj[`ISBN:${isbn}`]['number_of_pages'],
					author: obj[`ISBN:${isbn}`]['authors'][0]['name'],
					cover: obj[`ISBN:${isbn}`]['cover']
						? obj[`ISBN:${isbn}`]['cover']['medium']
						: null,
				});
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	const checkForDuplicates = () => {
		setMessage('');
		if (books === undefined || books === null) {
			setBooks([currentBook]);
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
		setBooks((oldBooks) => [...oldBooks, currentBook]);
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
		<div>
			<h1>Hello {credentials && credentials.username}!</h1>
			{error && <span className='errorMessage'>{error}</span>}
			{credentials && <button onClick={logout}>Logout</button>}
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
				<button type='submit'>Search</button>
				<button onClick={library}>My Library</button>
				{currentBook && (
					<div className='searchResult'>
						<img src={currentBook.cover} alt='Book cover'></img>
						<h2>Title: {currentBook.title}</h2>
						<h3>Author: {currentBook.author}</h3>
						<button onClick={checkForDuplicates}>Add book</button>
					</div>
				)}
			</form>
			{message}
			<div></div>
		</div>
	);
}
