//refresh sidebar after profile editting to immediately show
//the new banner, pfp, or text-based account details w/o page reload
export const updateSidebar = (tag: string) => {
	const side = document.getElementById("sidebar");
	if (side) {
		const updateEvent = new CustomEvent("updateSidebar", { detail: tag });
		console.log("dispatched");

		side.dispatchEvent(updateEvent);
	}
};
