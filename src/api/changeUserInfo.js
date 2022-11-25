import { BASE_URL } from '../api/config';

export const changeUserInfo = async (
	credentials,
	key,
	value,
	setCredentials
) => {
	fetch(`${BASE_URL}/profile/updateProfile`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${credentials.username}:${credentials.password}`,
		},
		body: JSON.stringify([key, value]),
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			setCredentials({
				username: data.username,
				password: data.password,
				picture:
					data.picture ||
					'https://i.ibb.co/D4j9KrG/znak-zapytania2.jpg',
				goal: data.goal || null,
			});
		});
};
