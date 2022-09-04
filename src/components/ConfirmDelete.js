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
			<div className='popup-inner '>
				<h2>
					Are you sure you want to delete this book? This process
					cannot be undone.
				</h2>
				<section>
					<button
						className='smallerButton '
						onClick={() => {
							props.setPopup(false);
						}}
					>
						Close
					</button>
					<button
						className='smallerButton '
						onClick={() => {
							props.setPopup(false);
							deleteBook(books, props.bookToDelete);
						}}
					>
						Delete
					</button>
				</section>
			</div>
		</div>
	) : (
		''
	);
}

export default ConfirmDelete;
