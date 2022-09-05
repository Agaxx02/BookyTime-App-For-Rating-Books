import { handleErrors } from './handleErrors';

export const searchISBN = async (isbn) => {
	let fetchedData = null;
	await fetch(
		typeof isbn === Number
			? `https://api.allorigins.win/get?url=${encodeURIComponent(
					`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
			  )}`
			: `https://api.allorigins.win/get?url=${encodeURIComponent(
					`http://openlibrary.org/search.json?q=${isbn}`
			  )}`
	)
		.then(handleErrors)
		.then((data) => {
			let obj = data.contents;
			obj = JSON.parse(obj);
			console.log(obj.docs);
			fetchedData = obj.docs;
		});

	return fetchedData;
};
