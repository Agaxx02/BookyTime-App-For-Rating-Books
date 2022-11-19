import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { getBooks } from '../api/getBooks';
import { searchBooks } from '../api/searchBooks';
import SearchResults from '../components/SearchResults';

export default function Dashboard() {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);
	const [books, setBooks] = useState(null);
	const [inputText, setInputText] = useState(null);
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

	const search = async (inputText) => {
		if (inputText === null || inputText === '') {
			return;
		}
		searchBooks(inputText).then((responseJSON) => {
			setSearchResults(responseJSON);
		});
	};

	const goToLibrary = () => {
		navigate('/library');
	};
	const goToProfile = () => {
		navigate('/profile');
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

			<button className='smallerButton' onClick={goToLibrary}>
				My Library
			</button>
			<button className='smallerButton' onClick={goToProfile}>
				Profile
			</button>
			<button onClick={logout} className='smallerButton'>
				Logout
			</button>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setShowResults(true);
					search(inputText);
				}}
			>
				<label htmlFor='inputText'>Title or ISBN number:</label>
				<input
					id='inputText'
					onChange={(e) => {
						setInputText(e.target.value);
						setMessage('');
						setShowResults(false);
					}}
				></input>
				<button className=' smallerButton' type='submit'>
					Search
				</button>
				{showResults ? (
					<SearchResults
						searchResults={searchResults}
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
