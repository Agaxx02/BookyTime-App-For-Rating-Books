import React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { getBooks } from '../api/getBooks';
import { useQuery } from '@tanstack/react-query';
import { updateBooks } from '../api/updateBooks';

export default function Library() {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);
	const [error, setError] = useState('');
	const [edit, setEdit] = useState(false);
	const [currentId, setCurrentId] = useState('');
	const [rate, setRate] = useState('');
	const [comment, setComment] = useState('');
	const [filter, setFilter] = useState([true, true]);
	const [, setSort] = useState('Highest Rate');
	const navigate = useNavigate();

	const { data } = useQuery(['books'], () => {
		getBooks(credentials);
	});
	console.log(data);

	const dashboard = () => {
		navigate('/dashboard');
	};
	const logout = () => {
		setCredentials(null);
		navigate('/');
	};
	const deleteBook = (index) => {
		data.splice(index, 1);
		updateBooks(data, credentials);
	};

	const toggleFilter = (index) => {
		filter[index] = !filter[index];
		setFilter([...filter]);
	};

	return (
		<div className='library'>
			<h1>Your library</h1>
			{error && <span className='errorMessage'>{error}</span>}
			<button
				className='button'
				onClick={(e) => {
					e.preventDefault();
					dashboard();
				}}
			>
				Search books
			</button>
			{credentials && (
				<button
					className='button'
					onClick={(e) => {
						e.preventDefault();
						logout();
					}}
				>
					Logout
				</button>
			)}
			{/* <div>
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
			</div> */}

			{
				<section>
					{data &&
						data.map((book, index) => {
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
									</section>
									<section className='item-c'>
										<button
											onClick={(e) => {
												e.preventDefault();
												book.read = !book.read;
												updateBooks(data, credentials);
												console.log(book, data);
											}}
										>
											{book.read ? 'Unfinished' : 'Finished'}
										</button>
										<button
											onClick={() => {
												deleteBook(index);
											}}
										>
											Delete
										</button>
										{book.read && (
											<section>
												<button
													onClick={(e) => {
														e.preventDefault();
													}}
												>
													Edit
												</button>
											</section>
										)}
									</section>
									<section className='item-d'>
										{book._id === currentId && edit && (
											<div className='editForm'>
												<form
													onSubmit={(e) => {
														e.preventDefault();
													}}
												>
													<label
														className='item-label1 '
														htmlFor='rate'
													>
														Rate
													</label>
													<input
														className='item-input1'
														type='number'
														id='rate'
														defaultValue={book.rate}
														onChange={(e) => setRate(e.target.value)}
													></input>
													<br />
													<label
														className='item-label2 '
														htmlFor='comment'
													>
														Your comment
													</label>
													<textarea
														className='item-input2'
														name='comment'
														defaultValue={book.comment}
														id='comment'
														onChange={(e) =>
															setComment(e.target.value)
														}
													></textarea>

													<button
														className='item-saveEdit'
														type='submit'
													>
														Save
													</button>
												</form>
											</div>
										)}
									</section>
								</div>
							);
						})}
				</section>
			}
		</div>
	);
}
