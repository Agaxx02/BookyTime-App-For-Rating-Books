import React, { useRef } from 'react';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { handleErrors } from './Register';

export default function Library() {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);
	const [books, setBooks] = useState([]);
	const [error, setError] = useState('');
	const [edit, setEdit] = useState(false);
	const [currentId, setCurrentId] = useState('');
	const [rate, setRate] = useState('');
	const [comment, setComment] = useState('');
	const [filter, setFilter] = useState([true, true]);
	const [sort, setSort] = useState('Highest Rate');
	const navigate = useNavigate();

	const useDidMountEffect = () => {
		const didMount = useRef(true);
		useEffect(() => {
			if (didMount.current) {
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
			didMount.current = false;

			console.log(books, typeof books);
		});
	};
	useDidMountEffect((e) => {
		e.preventDefault();
	});

	const dashboard = () => {
		navigate('/dashboard');
	};
	const logout = () => {
		setCredentials(null);
		navigate('/');
	};
	const deleteBook = (index) => {
		books.splice(index, 1);
		setBooks([...books], updateBooks(books, credentials));
	};

	const updateBooks = async (books, credentials) => {
		fetch('http://localhost:8000/deleteBook', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${credentials.username}:${credentials.password}`,
			},
			body: JSON.stringify(books),
		});
		console.log(typeof books, books);
	};
	const toggleFilter = (index) => {
		let filterValues = filter;
		filter[index] = !filter[index];
		setFilter([...filter]);
	};
	const getBooks = () => {
		if (filter[0] && filter[1]) {
			return books;
		} else if (filter[0]) {
			return books.filter((books) => {
				return books.read === true;
			});
		} else if (filter[1]) {
			return books.filter((books) => {
				return books.read === false;
			});
		} else {
			return [];
		}
	};
	const toggleFinished = (index) => {
		books[index]['read'] = !books[index]['read'];
		setBooks([...books], updateBooks(books, credentials));
	};
	const editBook = (id) => {
		setEdit(true);
		setCurrentId(id);
	};
	const saveEdit = (id) => {
		for (let i = 0; i < books.length; i++) {
			if (books[i]._id === id) {
				books[i].rate = rate;
				books[i].comment = comment;
				setBooks([...books], updateBooks(books, credentials));
			}
			setEdit(false);
		}
	};
	const sortBooks = (value) => {
		setSort(value);
		if (value === 'Highest Rate') {
			console.log(
				getBooks().sort((a, b) => {
					return b.rate - a.rate;
				})
			);
		} else if (value === 'Lowest') {
			console.log(
				getBooks().sort((a, b) => {
					return a.rate - b.rate;
				})
			);
		}
	};

	return (
		<div>
			<h1>Your library</h1>
			{credentials && (
				<button
					onClick={(e) => {
						e.preventDefault();
						logout();
					}}
				>
					Logout
				</button>
			)}
			<button
				onClick={(e) => {
					e.preventDefault();
					dashboard();
				}}
			>
				Search books
			</button>
			<div>
				<label htmlFor='finished'>Finished</label>
				<input
					type='checkbox'
					id='finished'
					defaultChecked
					onChange={() => {
						toggleFilter(0);
					}}
				/>
				<label htmlFor='unfinished'>Unfinished</label>
				<input
					type='checkbox'
					id='unfinished'
					defaultChecked
					onChange={() => {
						toggleFilter(1);
					}}
				/>
			</div>
			<div>
				<label htmlFor='sort'>Sort</label>
				<select
					onChange={(e) => {
						e.preventDefault();
						sortBooks(e.target.value);
					}}
					id='sort'
				>
					<option>Highest Rate</option>
					<option>Lowest Rate </option>
				</select>
			</div>

			<section>
				{books &&
					getBooks().map((book, index) => {
						return (
							<div key={book._id}>
								<img src={book.cover} alt='Book cover'></img>
								<h4>{book.title}</h4>
								<h4>{book.author}</h4>
								<h4>{book.numOfPages}</h4>
								<img
									alt='delete book'
									src='./icons8-delete-24.png'
									onClick={() => {
										deleteBook(index);
									}}
								></img>
								<button
									onClick={(e) => {
										e.preventDefault();
										toggleFinished(index);
									}}
								>
									{book.read ? 'Unfinished' : 'Finished'}
								</button>

								{book.read && (
									<section>
										<button
											onClick={(e) => {
												e.preventDefault();
												editBook(book._id);
											}}
										>
											Edit
										</button>
									</section>
								)}
								{book._id === currentId && edit && (
									<form
										onSubmit={(e) => {
											e.preventDefault();
											saveEdit(book._id);
										}}
									>
										<label htmlFor='rate'>Rate</label>
										<input
											type='number'
											id='rate'
											defaultValue={book.rate}
											onChange={(e) => setRate(e.target.value)}
										></input>
										<label htmlFor='comment'>Your comments</label>
										<textarea
											name='comment'
											defaultValue={book.comment}
											id='comment'
											onChange={(e) => setComment(e.target.value)}
										></textarea>
										<button type='submit'>Save</button>
									</form>
								)}
							</div>
						);
					})}
			</section>
		</div>
	);
}
