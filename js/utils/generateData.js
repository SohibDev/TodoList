function generateDate(time) {
	const date = new Date(time);
	const year = date.getFullYear();
	let month = date.getMonth() + 1;
	let hour = date.getHours();
	let minutes = date.getMinutes();
	let day = date.getDate();

	if (day < 10) {
		day = '0' + day;
	}
	if (month < 10) {
		month = '0' + month;
	}
	if (hour < 10) {
		hour = '0' + hour;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}

	return `${hour}:${minutes} / ${day}.${month}.${year}`;
}