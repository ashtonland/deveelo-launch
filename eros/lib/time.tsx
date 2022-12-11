export const timeAgo = (isoTime: string): string => {
	const date = new Date(isoTime);

	const dateInSeconds = date.getTime() / 1000;
	const nowInSeconds = new Date().getTime() / 1000;

	const diff = Math.abs(nowInSeconds - dateInSeconds);

	if (diff < 60) {
		return Math.floor(diff) + " seconds";
	} else if (diff < 3600) {
		return Math.floor(diff / 60) + " minutes";
	} else if (diff < 86400) {
		return Math.floor(diff / 3600) + " hours";
	} else if (diff < 604800) {
		return Math.floor(diff / 86400) + " days";
	} else if (diff < 2628000) {
		return Math.floor(diff / 604800) + " weeks";
	} else if (diff < 31540000) {
		return Math.floor(diff / 2628000) + " months";
	} else {
		return Math.floor(diff / 31540000) + " years";
	}
};
