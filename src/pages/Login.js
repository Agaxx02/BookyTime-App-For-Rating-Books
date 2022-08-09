import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { handleErrors } from './Register';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const [credentials, setCredentials] = useContext(
		CredentialsContext
	);

	const login = (e) => {
		e.preventDefault();
		fetch(`https://bookytime-server.herokuapp.com/loginUser`, {
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
			.then(() => {
				setCredentials({ username, password });
				navigate('/dashboard');
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	return (
		<div className='login'>
			<h1>Login</h1>
			{error && <span className='errorMessage'>{error}</span>}
			<form onSubmit={login}>
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
				<button type='submit' className='button'>
					Login
				</button>
			</form>
		</div>
	);
}
