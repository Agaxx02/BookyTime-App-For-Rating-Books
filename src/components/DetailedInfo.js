import React from 'react';

export default function DetailedInfo(props) {
	console.log(props.book);
	return (
		<div className='popup'>
			<div className='popup-inner '>
				<h2>Title: {props.book.title}</h2>
				<h2>Author: {props.book.author_name}</h2>
				<h2>ISBN Number: {props.book.isbn[0]}</h2>
				<h2>Number of pages: {props.book.number_of_pages_median}</h2>
				<img
					className='cover'
					alt='cover'
					src={`https://covers.openlibrary.org/b/id/${props.book.cover_i}-M.jpg`}
				></img>
				<button
					onClick={() => {
						props.close(false);
					}}
				>
					Close
				</button>
			</div>
		</div>
	);
}
