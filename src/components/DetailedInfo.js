import React from 'react';

export default function DetailedInfo(props) {
	console.log(props.book, typeof props.book.publish_date);
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
				<section className='info moreInfo'>
					<h2>Title: {props.book.title}</h2>
					<h2>Author: {props.book.author_name}</h2>
					<h2>
						ISBN Number:
						{typeof props.book.isbn !== String
							? props.book.isbn[0]
							: props.book.isbn}
					</h2>
					<h2>
						Number of pages:
						{props.book.number_of_pages_median
							? props.book.number_of_pages_median
							: 'unknown'}
					</h2>
					<h2>
						Publishers:
						{props.book.publisher.map((publisher, index) => {
							if (index < 9) {
								return <span key={index}> {publisher},</span>;
							}
							if (index === 10) {
								return <span key={index}> {publisher}</span>;
							} else {
								return null;
							}
						})}
					</h2>
					{props.book.publish_date &&
					typeof props.book.publish_date !== String ? (
						<h2>Published: {props.book.publish_date[0]}</h2>
					) : (
						<h2>Published: {props.book.publish_date}</h2>
					)}

					{props.book.subject_facet ? (
						<h2>
							Subjects:
							{props.book.subject_facet.map((subject, index) => {
								if (index === 10) {
									return <span key={index}> {subject}</span>;
								} else if (index < 10) {
									return <span key={index}> {subject}, </span>;
								} else {
									return null;
								}
							})}
						</h2>
					) : null}
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
