import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { getBooks } from '../api/getBooks';
import { searchISBN } from '../api/searchISBN';
import SearchResults from '../components/SearchResults';

export default function Dashboard() {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);
	const [books, setBooks] = useState(null);
	const [isbnNumber, setIsbnNumber] = useState(null);
	const [searchResults, setSearchResults] = useState(null);
	const [message, setMessage] = useState('');
	const [showResults, setShowResults] = useState(false);
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
			setSearchResults(responseJSON);
		});
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
						setShowResults(true);
					}}
				></input>
				<button className=' smallerButton' type='submit'>
					Search
				</button>
				{showResults ? (
					<SearchResults
						inputText={searchResults}
						books={books}
						credentials={credentials}
					/>
				) : null}
			</form>
			{message}
			<div></div>
		</div>
	);
}
