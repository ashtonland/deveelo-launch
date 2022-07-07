export const updateSidebar = (tag: string) => {
	const side = document.getElementById("sidebar");
	if (side) {
		const updateEvent = new CustomEvent("updateSidebar", { detail: tag });
		console.log("dispatched");

		side.dispatchEvent(updateEvent);
	}
};
