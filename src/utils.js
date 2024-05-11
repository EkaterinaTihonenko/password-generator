export function getRandomChar(start, end) {
	const limit = end - start + 1;
	return String.fromCharCode(Math.floor(Math.random() * limit) + start);
}

export function getSpecialChar() {
	const specialChar = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~'";
	return specialChar[Math.floor(Math.random() * specialChar.length)];
}
