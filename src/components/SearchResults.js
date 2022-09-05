import React, { useState } from 'react';
import { updateBooks } from '../api/updateBooks';

export default function SearchResults(props) {
	const [books, setBooks] = useState(props.books);
	const [currentBook, setCurrentBook] = useState({});
	const [message, setMessage] = useState('');

	const addBook = () => {
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
			<h3>Search results:</h3>

			{props.inputText !== null
				? props.inputText.map((book, index) => {
						console.log(book);
						return (
							<div key={index}>
								<h3>{book.title}</h3>
								<h3>{book.author_name}</h3>
								<button
									onClick={() => {
										setCurrentBook(book, addBook(currentBook));
									}}
								>
									Add book
								</button>
								{message}
							</div>
						);
				  })
				: null}
		</div>
	);
}
