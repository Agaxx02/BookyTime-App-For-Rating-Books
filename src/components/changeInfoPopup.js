import React, { useState } from 'react';
import { CredentialsContext } from '../App';
import { useContext } from 'react';
import { changeUserInfo } from '../api/changeUserInfo';
import ImgPick from './ImgPick';

function ChangeInfoPopup(props) {
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);
	const [currentInput, setCurrentInput] = useState();

	return (
		<div className='popup'>
			<div className='popup-inner '>
				{props.target === 'picture' ? (
					<ImgPick setPicture={setCurrentInput} />
				) : (
					''
				)}
				{props.target === 'username' ? (
					<section>
						<h3>New username: </h3>
						<input
							type='text'
							onChange={(e) => setCurrentInput(e.target.value)}
						></input>
					</section>
				) : (
					''
				)}
				{props.target === 'goal' ? (
					<section>
						<h3>Goal for this year: </h3>
						<input
							type='number'
							onChange={(e) => setCurrentInput(e.target.value)}
						></input>
					</section>
				) : (
					''
				)}
				<button
					className='smallerButton '
					onClick={() => {
						if (!currentInput) {
							return;
						}
						changeUserInfo(
							credentials,
							props.target,
							currentInput,
							setCredentials
						);
						props.closePopup(false);
					}}
				>
					Save
				</button>
				<button
					className='smallerButton '
					onClick={() => {
						props.closePopup(false);
					}}
				>
					Close
				</button>
			</div>
		</div>
	);
}

export default ChangeInfoPopup;
