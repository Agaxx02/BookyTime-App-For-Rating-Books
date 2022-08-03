import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
	return (
		<div className='welcome'>
			<h1>Welcome!</h1>
			<Link to='/login' className='button link'>
				Login
			</Link>
			<Link to='/register' className='button link'>
				Register
			</Link>
		</div>
	);
}
