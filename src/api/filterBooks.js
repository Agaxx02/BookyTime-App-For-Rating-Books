export const filterBooks = (data, showFinished, showUnfinished) => {
	return data.filter((book) => {
		if (showFinished && showUnfinished) {
			return book;
		} else if (showFinished) {
			return book.read === true;
		} else if (showUnfinished) {
			return book.read === false;
		} else {
			return null;
		}
	});
};
