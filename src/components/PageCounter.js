import React from 'react';

function PageCounter(props) {
	const countPages = (props) => {
		if (props.props === undefined || props.props === null) {
			let pages = 0;
			return pages;
		} else {
			let pages = 0;
			props.props.forEach((book) => {
				if (book.read === true) {
					pages = pages + book.numOfPages;
				}
			});
			return pages;
		}
	};

	return <h4>Page Counter: {countPages(props)}</h4>;
}

export default PageCounter;
