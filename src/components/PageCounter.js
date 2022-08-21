import React from 'react';

function PageCounter(props) {
	const countPages = (props) => {
		let pages = 0;
		props.props.forEach((book) => {
			if (book.read === true) {
				pages = pages + book.numOfPages;
			}
		});
		return pages;
	};

	return <div>Page Counter: {countPages(props)}</div>;
}

export default PageCounter;
