import { handleErrors } from './handleErrors';

export const searchISBN = async (isbn) => {
	await fetch(
		`https://api.allorigins.win/get?url=${encodeURIComponent(
			`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
		)}`
	)
		.then(handleErrors)
		.then((data) => {
			let obj = data.contents;
			obj = JSON.parse(obj);
			let currentBook = {
				title: obj[`ISBN:${isbn}`]['title'],
				numOfPages: obj[`ISBN:${isbn}`]['number_of_pages'],
				author: obj[`ISBN:${isbn}`]['authors'][0]['name'],
				cover: obj[`ISBN:${isbn}`]['cover']
					? obj[`ISBN:${isbn}`]['cover']['medium']
					: './No_cover.jpg',
				rate: null,
				read: false,
				comment: null,
				date: null,
			};
			console.log(currentBook);
			return currentBook;
		});
};
