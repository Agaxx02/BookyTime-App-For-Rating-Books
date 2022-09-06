import { handleErrors } from './handleErrors';

export const searchISBN = async (inputText) => {
	let fetchedData = null;
	await fetch(
		typeof inputText === Number
			? `https://api.allorigins.win/get?url=${encodeURIComponent(
					`https://openlibrary.org/api/books?bibkeys=ISBN:${inputText}&format=json&jscmd=data`
			  )}`
			: `https://api.allorigins.win/get?url=${encodeURIComponent(
					`http://openlibrary.org/search.json?q=${inputText}`
			  )}`
	)
		.then(handleErrors)
		.then((data) => {
			let obj = data.contents;
			obj = JSON.parse(obj);
			fetchedData = obj.docs.slice(0, 20);
		});

	return fetchedData;
};
