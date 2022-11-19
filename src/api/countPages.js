export const countPages = (books) => {
	if (books === undefined || books === null) {
		let pages = 0;
		return pages;
	} else {
		let pages = 0;
		books.forEach((book) => {
			if (book.read === true) {
				pages = pages + book.numOfPages;
			}
		});
		return pages;
	}
};
