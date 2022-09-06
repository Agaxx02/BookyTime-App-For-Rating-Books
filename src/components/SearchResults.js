import React, { useState } from 'react';
import { updateBooks } from '../api/updateBooks';

export default function SearchResults(props) {
	const [books, setBooks] = useState(props.books);
	const [message, setMessage] = useState('');

	const addBook = (currentBook) => {
		console.log(currentBook);
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
							<div key={index}>
								<h3>{book.title}</h3>
								<h3>{book.author_name}</h3>
								<img
									alt='cover'
									src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
								></img>
								<button
									onClick={() => {
										console.log(book);

										addBook({
											title: book.title,
											numOfPages: book.number_of_pages_median,
											author: book.author_name.toString(),
											cover: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
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
							</div>
						);
				  })
				: null}
		</div>
	);
}
