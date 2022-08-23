import React from 'react';
import { CredentialsContext } from '../App';
import { useContext } from 'react';
import { getBooks } from '../api/getBooks';
import { useQuery } from '@tanstack/react-query';
import { updateBooks } from '../api/updateBooks';

function ConfirmDelete(props) {
	const [credentials] = useContext(CredentialsContext);
	const { data } = useQuery(['books'], () => {
		return getBooks(credentials);
	});

	const deleteBook = (data, bookToDelete) => {
		let books = data;
		books.forEach((book, index) => {
			if (book.title === bookToDelete.title) {
				books.splice(index, 1);
				data = books;
				props.setBooks([...data], updateBooks(data, credentials));
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
						deleteBook(data, props.bookToDelete);
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
