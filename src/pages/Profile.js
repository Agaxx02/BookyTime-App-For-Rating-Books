import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../api/getBooks';
import { CredentialsContext } from '../App';
import { countPages } from '../api/countPages';
import ChangeInfoPopup from '../components/changeInfoPopup';

function Profile() {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);
	const [books, setBooks] = useState(null);
	const [changeInfo, setChangeInfo] = useState(false);
	const [target, setTarget] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData(credentials) {
			await getBooks(credentials).then((data) => {
				setBooks(data);
			});
		}
		fetchData(credentials);
	}, [credentials]);

	const countBooks = (time) => {
		let numOfBooksMonth = 0;
		let numOfBooksYear = 0;
		let currentDate = new Date();
		if (!books) {
			return;
		} else {
			books.forEach((book) => {
				let updated = new Date(book.lastUpdated);
				if (
					currentDate.getYear() === updated.getYear() &&
					currentDate.getMonth() === updated.getMonth()
				) {
					numOfBooksMonth++;
				} else if (currentDate.getYear() === updated.getYear()) {
					numOfBooksYear++;
				}
			});
		}
		return time === 'month' ? numOfBooksMonth : numOfBooksYear;
	};

	const goToDashboard = () => {
		navigate('/dashboard');
	};
	const goToLibrary = () => {
		navigate('/library');
	};
	const logout = () => {
		setCredentials(null);
		navigate('/');
	};

	return (
		<div>
			<h1 className='pageTitle'>Profile</h1>
			<section>
				<button
					className='smallerButton'
					onClick={(e) => {
						e.preventDefault();
						goToDashboard();
					}}
				>
					Search books
				</button>
				<button onClick={goToLibrary} className='smallerButton'>
					My Library
				</button>
				<button onClick={logout} className='smallerButton'>
					Logout
				</button>
			</section>
			<div className='profileInfo'>
				<img
					className='profilePicture'
					alt='profile '
					src={
						credentials.picture ||
						'https://i.ibb.co/D4j9KrG/znak-zapytania2.jpg'
					}
				></img>
				<button
					onClick={(e) => {
						e.preventDefault();
						setTarget('picture');
						setChangeInfo(true);
					}}
				>
					Change profile picture
				</button>
				{changeInfo ? (
					<ChangeInfoPopup
						closePopup={setChangeInfo}
						target={target}
					/>
				) : null}
				<h4>Username: {credentials.username}</h4>
				<button
					onClick={(e) => {
						e.preventDefault();
						setTarget('username');
						setChangeInfo(true);
					}}
				>
					Change username
				</button>
			</div>
			<div className='statistics'></div>
			<h4>
				Goal for this year:
				{credentials.goal ? credentials.goal : ' not stated'}
			</h4>

			<button
				onClick={(e) => {
					e.preventDefault();
					setTarget('goal');
					setChangeInfo(true);
				}}
			>
				Change goal
			</button>
			<h4>Books read this year: {countBooks('year')} </h4>
			<h4>
				Books left to read this year:
				{credentials.goal - countBooks('year')}
			</h4>
			<h4>Books read this month: {countBooks('month')}</h4>
			<h4>Pages read this year: {countPages(books)}</h4>
		</div>
	);
}

export default Profile;
