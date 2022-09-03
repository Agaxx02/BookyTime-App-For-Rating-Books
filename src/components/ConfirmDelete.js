import React, { useState } from 'react';
import { CredentialsContext } from '../App';
import { useContext } from 'react';
import { updateBooks } from '../api/updateBooks';

function ConfirmDelete(props) {
	const [credentials] = useContext(CredentialsContext);
	const [books] = useState(props.allBooks);

	const deleteBook = (books, bookToDelete) => {
		books.forEach((book, index) => {
			if (book.title === bookToDelete.title) {
				books.splice(index, 1);
				props.setBooks([...books], updateBooks(books, credentials));
			}
		});
	};

	return props.confirm ? (
		<div className='popup'>
			<div className='popup-inner'>
				<button
					className='close-btn '
					onClick={() => {
						props.setPopup(false);
					}}
				>
					Close
				</button>
				<h2>
					Are you sure you want to delete this book? This process
					cannot be undone.
				</h2>
				<button
					onClick={() => {
						props.setPopup(false);
					}}
				>
					Close
				</button>
				<button
					onClick={() => {
						props.setPopup(false);
						deleteBook(books, props.bookToDelete);
					}}
				>
					Delete
				</button>
			</div>
		</div>
	) : (
		''
	);
}

export default ConfirmDelete;
