export const filterAndSortBooks = (
	books,
	showFinished,
	showUnfinished,
	sort
) => {
	let filtered = books.filter((book) => {
		if (showFinished && showUnfinished) {
			return book;
		} else if (showFinished) {
			return book.read === true;
		} else if (showUnfinished) {
			return book.read === false;
		} else {
			return [];
		}
	});
	filtered.sort((a, b) => {
		let sorted;
		switch (sort) {
			case 'Highest Rate':
				sorted = b.rate - a.rate;
				break;
			case 'Lowest Rate':
				sorted = a.rate - b.rate;
				break;
			case 'Most Pages':
				sorted = b.numOfPages - a.numOfPages;
				break;
			case 'Least Pages':
				sorted = a.numOfPages - b.numOfPages;
				break;
			case 'Title A-Z':
				sorted = a.title.localeCompare(b.title);
				break;
			case 'Title Z-A':
				sorted = b.title.localeCompare(a.title);
				break;
			case 'Author A-Z':
				sorted = a.author.localeCompare(b.author);
				break;
			case 'Author Z-A':
				sorted = b.author.localeCompare(a.author);
				break;
			case 'Date Added ^':
				sorted = new Date(a.dateAdded) - new Date(b.dateAdded);
				break;
			case 'Date Added v':
				sorted = new Date(b.dateAdded) - new Date(a.dateAdded);
				break;
			case 'Date Updated ^':
				sorted = new Date(a.lastUpdated) - new Date(b.lastUpdated);
				break;
			case 'Date Updated v':
				sorted = new Date(b.lastUpdated) - new Date(a.lastUpdated);
				break;
			default:
				return sorted;
		}

		return sorted;
	});

	return filtered;
};
