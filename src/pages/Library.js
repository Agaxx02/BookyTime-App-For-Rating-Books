import React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { getBooks } from '../api/getBooks';
import { useQuery } from '@tanstack/react-query';
import { updateBooks } from '../api/updateBooks';
import EditForm from '../components/EditForm';

export default function Library() {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);

	const [showEdit, setShowEdit] = useState(false);
	const [currentBook, setCurrentBook] = useState('');
	const navigate = useNavigate();

	const { data } = useQuery(['books'], () => {
		return getBooks(credentials);
	});

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
