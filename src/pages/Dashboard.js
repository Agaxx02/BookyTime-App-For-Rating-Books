import React, {
	useContext,
	useEffect,
	useState,
	useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { handleErrors } from './Register';

export default function Dashboard() {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);
	const [isbn, setIsbn] = useState('');
	const [currentBook, setCurrentBook] = useState(null);
	const [books, setBooks] = useState([]);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const useDidMountEffect = () => {
		const didMount = useRef(false);
		useEffect(() => {
			if (didMount.current) {
				persist(books);
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
	useDidMountEffect();

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
				console.log(obj);
				setCurrentBook({
					title: obj[`ISBN:${isbn}`]['title'],
					numOfPages: obj[`ISBN:${isbn}`]['number_of_pages'],
					author: obj[`ISBN:${isbn}`]['authors'][0]['name'],
					cover: obj[`ISBN:${isbn}`]['cover']['medium'],
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
		if (books === undefined || books === null) {
			setBooks([currentBook]);
			return;
		}
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

	const library = () => {
		navigate('/library');
	};

	return (
		<div>
			<h1>Hello {credentials && credentials.username}!</h1>
			{error && <span className='errorMessage'>{error}</span>}
			<form onSubmit={search}>
				<label htmlFor='ISBNNumber'>ISBN Number</label>
				<input
					id='ISBNNumber'
					onChange={(e) => setIsbn(e.target.value)}
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
			<div></div>
		</div>
	);
}
