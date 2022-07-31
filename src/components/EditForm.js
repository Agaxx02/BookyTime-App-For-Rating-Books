import React, { useContext, useState } from 'react';
import { CredentialsContext } from '../App';
import { updateBooks } from '../pages/Library';

export default function EditForm(props) {
	const [books, setBooks] = useState([]);
	const [edit, setEdit] = useState(false);
	const [rate, setRate] = useState(null);
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);

	const saveEdit = () => {
		if (rate > 10 || rate < 1) {
			return;
		}
		books[props[1].rate] = rate;
		setBooks([...books], updateBooks(books, credentials));
	};

	return (
		<div>
			<button
				onClick={(e) => {
					e.preventDefault();
					setEdit(true);
				}}
			>
				Edit
			</button>
			{edit && (
				<form onSubmit={saveEdit}>
					<label htmlFor='rate'>Rate</label>
					<input
						id='rate'
						type='number'
						placeholder='1-10'
						onChange={(e) => setRate(e.target.value)}
					></input>
					<button type='submit'>Save</button>
				</form>
			)}
		</div>
	);
}
