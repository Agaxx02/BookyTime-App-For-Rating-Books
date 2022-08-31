import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
	return (
		<div className='welcome'>
			<h1 className='pageTitle'>Welcome!</h1>
			<Link to='/login' className='button '>
				Login
			</Link>
			<Link to='/register' className='button '>
				Register
			</Link>
		</div>
	);
}
