import React, { useState } from 'react';
import { updateBooks } from '../api/updateBooks';
import DetailedInfo from './DetailedInfo';

export default function SearchResults(props) {
	const [books, setBooks] = useState(props.books);
	const [message, setMessage] = useState('');
	const [showInfo, setShowInfo] = useState(false);
	const [currentBook, setCurrentBook] = useState({});

	const addBook = (currentBook) => {
		if (books === undefined || books === null || books === []) {
			setBooks(
				[currentBook],
				updateBooks(currentBook, props.credentials)
			);
			setMessage('Book successfully added');
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
		let copied = books;
		copied = [...copied, currentBook];
		setBooks(
			(oldBooks) => [...oldBooks, currentBook],
			updateBooks(copied, props.credentials)
		);
		setMessage('Book successfully added');
	};

	return (
		<div>
			{message}
			<h3>Search results:</h3>

			{props.searchResults !== null
				? props.searchResults.map((book, index) => {
						return (
							<div key={index} className='book'>
								{book.cover_i === undefined ? (
									<img
										className='cover'
										alt='cover'
										src='https://i.ibb.co/xCL558g/No-Cover.jpg'
									></img>
								) : (
									<img
										className='cover'
										alt='cover'
										src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
									></img>
								)}

								<section className='info'>
									<h4>{book.title}</h4>
									<h4>{book.author_name}</h4>
								</section>
								<section className='editButtons'>
									<button
										className='smallerButton'
										onClick={() => {
											addBook({
												title: book.title,
												numOfPages: book.number_of_pages_median,
												author: book.author_name.toString(),
												cover: book.cover_i
													? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
													: 'https://i.ibb.co/xCL558g/No-Cover.jpg',
												rate: null,
												read: false,
												comment: null,
												dateAdded: new Date(),
												lastUpdated: new Date(),
											});
										}}
									>
										Add book
									</button>
									<button
										className='smallerButton'
										onClick={() => {
											setCurrentBook(book);
											setShowInfo(true);
										}}
									>
										More info
									</button>
								</section>
							</div>
						);
				  })
				: null}
			{showInfo ? (
				<DetailedInfo book={currentBook} close={setShowInfo} />
			) : null}
		</div>
	);
}
