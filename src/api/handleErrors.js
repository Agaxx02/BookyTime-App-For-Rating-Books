export const handleErrors = async (res) => {
	if (!res.ok) {
		const { message } = await res.json();
		throw Error(message);
	}
	return res.json();
};
