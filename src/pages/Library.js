import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { updateBooks } from '../api/updateBooks';
import { getBooks } from '../api/getBooks';
import { filterAndSortBooks } from '../api/filterAndSortBooks';
import EditForm from '../components/EditForm';
import PageCounter from '../components/PageCounter';
import ConfirmDelete from '../components/ConfirmDelete';

export default function Library() {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);
	const [books, setBooks] = useState(null);
	const [booksLoaded, setBooksLoaded] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [currentBook, setCurrentBook] = useState('');
	const [showFinished, setShowFinished] = useState(true);
	const [showUnfinished, setShowUnfinished] = useState(true);
	const [sort, setSort] = useState('Highest Rate');
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData(credentials) {
			await getBooks(credentials).then((data) => {
				setBooks(data);
			});
		}
		fetchData(credentials);
		console.log(books);
	}, []);
	const dashboard = () => {
		navigate('/dashboard');
	};
	const logout = () => {
		setCredentials(null);
		navigate('/');
	};

	return (
		<div className='library'>
			<h1>Your library</h1>
			<button
				className='button'
				onClick={(e) => {
					e.preventDefault();
					dashboard();
				}}
			>
				Search books
			</button>

			<button onClick={logout} className='button'>
				Logout
			</button>
			<PageCounter props={books} />
			<section>
				<input
					type='checkbox'
					id='finished'
					defaultChecked
					onChange={() => {
						setShowFinished(!showFinished);
					}}
				></input>
				<label htmlFor='finished'>Finished</label>
				<input
					type='checkbox'
					id='unfinished'
					defaultChecked
					onChange={() => {
						setShowUnfinished(!showUnfinished);
					}}
				></input>
				<label htmlFor='unfinished'>Unfinished</label>
				<br />
				<span>Sort by:</span>
				<select
					onChange={(e) => {
						setSort(e.target.value);
					}}
				>
					<option defaultValue>Highest Rate</option>
					<option>Lowest Rate</option>
					<option>Most Pages</option>
					<option>Least Pages</option>
					<option>Author A-Z</option>
					<option>Author Z-A</option>
					<option>Title A-Z</option>
					<option>Title Z-A</option>
					<option>Date Added ^</option>
					<option>Date Added v</option>
					<option>Date Updated ^</option>
					<option>Date Updated v</option>
				</select>
			</section>
			{
				<section>
					{/* {filterAndSortBooks(
						books,
						showFinished,
						showUnfinished,
						sort
					).map((book, index) => {
						return (
							<div className='book' key={book._id}>
								<img
									className='item-a cover'
									src={book.cover}
									alt='Book cover'
								></img>

								<section className='item-b'>
									<h4>Title: {book.title}</h4>
									<h4>Author: {book.author}</h4>
									<h4>Number of pages: {book.numOfPages} </h4>
									<h4>
										Date Added:{' '}
										{new Date(book.dateAdded).toLocaleDateString(
											'en-US'
										)}
									</h4>
									<h4>
										Last Updated:{' '}
										{new Date(book.lastUpdated).toLocaleDateString(
											'en-US'
										)}
									</h4>

									{book.rate ? (
										<h4>Your rate: {book.rate} </h4>
									) : null}
								</section>

								<section className='item-c'>
									<button
										onClick={(e) => {
											e.preventDefault();
											if (books[index].title === book.title) {
												books[index].read = !books[index].read;
												books[index].lastUpdated = new Date();
												setBooks(
													[...books],
													updateBooks(books, credentials)
												);
											}
										}}
									>
										{book.read ? 'Unfinished' : 'Finished'}
									</button>
									<button
										onClick={(e) => {
											e.preventDefault();
											setConfirmDelete(true);
											setCurrentBook(book);
										}}
									>
										Delete
									</button>
									{confirmDelete && book === currentBook ? (
										<ConfirmDelete
											confirm={confirmDelete}
											setPopup={setConfirmDelete}
											setBooks={setBooks}
											bookToDelete={book}
										/>
									) : null}
									{book.read && (
										<button
											onClick={(e) => {
												setShowEdit(true);
												setCurrentBook(book);
											}}
										>
											Edit
										</button>
									)}
								</section>
								{showEdit && book === currentBook ? (
									<EditForm
										props={currentBook}
										popup={showEdit}
										setPopup={setShowEdit}
										credentials={credentials}
									/>
								) : null}
							</div>
						);
					})} */}
				</section>
			}
		</div>
	);
}
