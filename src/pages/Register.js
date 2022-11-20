import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { BASE_URL } from '../api/config';
import { handleErrors } from '../api/handleErrors';

export default function Register() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const [, setCredentials] = useContext(CredentialsContext);

	const register = (e) => {
		e.preventDefault();
		if (username.length > 15) {
			setError('Username cannot be longer than 15 characters');
			return;
		}
		fetch(`${BASE_URL}/register/registerUser`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
				confirmPassword,
			}),
		})
			.then(handleErrors)
			.then(() => {
				setCredentials({
					username,
					password,
					picture: 'https://i.ibb.co/D4j9KrG/znak-zapytania2.jpg',
					goal: 0,
				});
				navigate('/dashboard');
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	return (
		<div>
			<h1 className='pageTitle'>Register</h1>
			{error ? (
				<span className='errorMessage'>{error}</span>
			) : (
				<h3 className='registerMessage'>
					Username and password have to contain only English letters
				</h3>
			)}
			<form className='authForm' onSubmit={register}>
				<label htmlFor='username'>Username</label>
				<input
					id='username'
					onChange={(e) => setUsername(e.target.value)}
				></input>
				<br />
				<label htmlFor='password'>Password</label>
				<input
					onChange={(e) => setPassword(e.target.value)}
					type='password'
					id='password'
				></input>
				<br />
				<label htmlFor='confirmPassword'>Confirm password</label>
				<input
					onChange={(e) => setConfirmPassword(e.target.value)}
					type='password'
					id='confirmPassword'
				></input>
				<br />
				<button type='submit' className='button'>
					Register
				</button>
			</form>
		</div>
	);
}
