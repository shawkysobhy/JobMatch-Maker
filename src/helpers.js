export const postedAtHandler = (fullDate) => {
	const date = new Date(fullDate);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	return `${month}/${year}`;
};

export const getEmptyProperties = (obj) => {
	const emptyProperties = [];
	Object.keys(obj).forEach((key) => {
		if (!obj[key]) {
			emptyProperties.push(key);
		}
	});
	return emptyProperties;
};

