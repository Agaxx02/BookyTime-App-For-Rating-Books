import React from 'react';
import { useContext, useState } from 'react';
import { CredentialsContext } from '../App';
import { updateBooks } from '../api/updateBooks';

function EditForm(props) {
	const [credentials] = useContext(CredentialsContext);
	const [rate, setRate] = useState(null);
	const [comment, setComment] = useState(null);
	const [currentBook] = useState(props.props);
	const [error, setError] = useState(null);
	const [books] = useState(props.allBooks);

	const saveEdit = () => {
		for (let i = 0; i < books.length; i++) {
			if (
				books[i].title === currentBook.title &&
				books[i].numOfPages === currentBook.numOfPages
			) {
				books[i].rate = rate;
				books[i].comment = comment;
				books[i].lastUpdated = new Date();
			}
		}
		updateBooks(books, credentials);
		props.setPopup(false);
	};

	return props.popup ? (
		<div className='popup'>
			<div className='popup-inner'>
				{error}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if ((rate > 10 || rate <= 0) && rate !== null) {
							setError('Rate has to be a number from 1-10');
							return;
						}
						saveEdit();
					}}
				>
					<section>
						<label htmlFor='rate'>Rate</label>
						<input
							id='rate'
							type='number'
							defaultValue={props.props.rate}
							onChange={(e) => {
								e.preventDefault();
								setError(null);
								setRate(e.target.value);
							}}
						></input>
					</section>
					<section>
						<label htmlFor='comment'>Comment</label>
						<textarea
							id='comment'
							defaultValue={props.props.comment}
							onChange={(e) => {
								e.preventDefault();
								setError(null);
								setComment(e.target.value);
							}}
						></textarea>
					</section>
					<button className='smallerButton ' type='submit'>
						Save
					</button>
					<button
						className='smallerButton '
						onClick={() => {
							props.setPopup(false);
						}}
					>
						Close
					</button>
				</form>
			</div>
		</div>
	) : (
		''
	);
}

export default EditForm;
