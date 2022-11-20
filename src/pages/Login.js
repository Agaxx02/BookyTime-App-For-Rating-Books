import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { handleErrors } from '../api/handleErrors';
import { BASE_URL } from '../api/config';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const [, setCredentials] = useContext(CredentialsContext);

	const login = (e) => {
		e.preventDefault();
		fetch(`${BASE_URL}/login/loginUser`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})
			.then(handleErrors)
			.then((res) => {
				setCredentials({
					username,
					password,
					picture: res.picture,
					goal: res.goal,
				});
				navigate('/dashboard');
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	return (
		<div>
			<h1 className='pageTitle'>Login</h1>
			{error && <span className='errorMessage'>{error}</span>}
			<form className='authForm' onSubmit={login}>
				<label htmlFor='username'>Username:</label>
				<input
					id='username'
					onChange={(e) => setUsername(e.target.value)}
				></input>
				<br />
				<label htmlFor='password'>Password:</label>
				<input
					onChange={(e) => setPassword(e.target.value)}
					type='password'
					id='password'
				></input>
				<br />
				<button type='submit' className='button'>
					Login
				</button>
			</form>
		</div>
	);
}
