export const filterAndSortBooks = (
	data,
	showFinished,
	showUnfinished,
	sort
) => {
	let filtered = data.filter((book) => {
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
	filtered.sort((a, b) => {
		let sorted;
		if (sort === 'Highest Rate') {
			sorted = b.rate - a.rate;
		} else if (sort === 'Lowest Rate') {
			sorted = a.rate - b.rate;
		}
		return sorted;
	});

	return filtered;
};
