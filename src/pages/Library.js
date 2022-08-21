import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { getBooks } from '../api/getBooks';
import { useQuery } from '@tanstack/react-query';
import { updateBooks } from '../api/updateBooks';
import { filterAndSortBooks } from '../api/filterAndSortBooks';
import EditForm from '../components/EditForm';
import PageCounter from '../components/PageCounter';

export default function Library() {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);
	const [books, setBooks] = useState([]);
	const [showEdit, setShowEdit] = useState(false);
	const [currentBook, setCurrentBook] = useState('');
	const [showFinished, setShowFinished] = useState(true);
	const [showUnfinished, setShowUnfinished] = useState(true);
	const [sort, setSort] = useState('Highest Rate');
	const navigate = useNavigate();

	let { data } = useQuery(['books'], () => {
		return getBooks(credentials);
	});

	useEffect(() => {
		setBooks(data);
	}, [data]);

	const dashboard = () => {
		navigate('/dashboard');
	};
	const logout = () => {
		setCredentials(null);
		navigate('/');
	};
	const deleteBook = (index, book) => {
		if (book.title === books[index].title) {
			books.splice(index, 1);
			data = books;
			setBooks([...books], updateBooks(books, credentials));
		}
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
			<PageCounter props={data} />
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
					<option>Lowest Rate</option>
					<option selected='selected'>Highest Rate</option>
				</select>
			</section>
			{
				<section>
					{filterAndSortBooks(
						data,
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
									{book.rate ? (
										<h4>Your rate: {book.rate} </h4>
									) : null}
									{book.comment ? (
										<h4>Your comment: {book.comment} </h4>
									) : null}
								</section>
								<section className='item-c'>
									<button
										onClick={(e) => {
											e.preventDefault();
											if (books[index].title === book.title) {
												books[index].read = !books[index].read;
												data = books;
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
											deleteBook(index, book);
										}}
									>
										Delete
									</button>
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
									<EditForm props={currentBook} />
								) : null}
							</div>
						);
					})}
				</section>
			}
		</div>
	);
}
