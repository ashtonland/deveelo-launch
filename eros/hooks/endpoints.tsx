export const searchUsers = async (str: string): Promise<any> => {
	if (!str) {
		return null;
	}

	try {
		const url = process.env.NODE_ENV === "production" ? "https://vega.deveelo.com/search?name=" : "http://localhost:4000/search?name=";
		const searchUrl = url + str;
		const request = await fetch(searchUrl, { method: "GET", credentials: "omit", mode: "cors" });
		const users = await request.json();
		return users;
	} catch (err) {
		console.error(err);
	}
};
