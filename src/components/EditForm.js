import React from 'react';
import { useContext, useState } from 'react';
import { CredentialsContext } from '../App';
import { getBooks } from '../api/getBooks';
import { useQuery } from '@tanstack/react-query';
import { updateBooks } from '../api/updateBooks';

function EditForm(props) {
	const [credentials] = useContext(CredentialsContext);
	const [rate, setRate] = useState(null);
	const [comment, setComment] = useState(null);
	const [currentBook] = useState(props.props);
	const [error, setError] = useState(null);

	const { data } = useQuery(['books'], () => {
		return getBooks(credentials);
	});

	const saveEdit = () => {
		for (let i = 0; i < data.length; i++) {
			if (
				data[i].title === currentBook.title &&
				data[i].numOfPages === currentBook.numOfPages
			) {
				data[i].rate = rate;
				data[i].comment = comment;
				data[i].lastUpdated = new Date();
			}
		}
		updateBooks(data, credentials);
		props.setPopup(false);
	};

	return props.popup ? (
		<div className='popup'>
			<div className='popup-inner'>
				{error}
				<button
					className='close-btn '
					onClick={() => {
						props.setPopup(false);
					}}
				>
					Close
				</button>
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
					<button type='submit'>Save</button>
				</form>
			</div>
		</div>
	) : (
		''
	);
}

export default EditForm;
