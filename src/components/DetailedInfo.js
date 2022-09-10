import React from 'react';

export default function DetailedInfo(props) {
	return (
		<div className='popup'>
			<div className='popup-inner book '>
				<section className='cover'>
					<img
						className='cover'
						alt='cover'
						src={`https://covers.openlibrary.org/b/id/${props.book.cover_i}-M.jpg`}
					></img>
				</section>
				<section className='info'>
					<h2>Title: {props.book.title}</h2>
					<h2>Author: {props.book.author_name}</h2>
					<h2>ISBN Number: {props.book.isbn[0]}</h2>
					<h2>
						Number of pages:
						{props.book.number_of_pages_median
							? props.book.number_of_pages_median
							: 'unknown'}
					</h2>
					<h2>Publisher: {props.book.publisher}</h2>
					<h2>
						Published: {props.book.publish_place},
						{props.book.publish_date}
					</h2>
					<h2>
						Subjects:{' '}
						{props.book.subject_facet
							? props.book.subject_facet + ', '
							: 'unknown'}
					</h2>
				</section>
				<section className='editButtons'>
					<button
						className='smallerButton'
						onClick={() => {
							props.close(false);
						}}
					>
						Close
					</button>
				</section>
			</div>
		</div>
	);
}
