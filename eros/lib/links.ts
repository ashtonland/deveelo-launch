/* VEGA */
export const prodServerUrl = "https://vega.deveelo.com/";
export const devServerUrl = "http://localhost:4000/";

//get the current vega url, and allow navigation to sub path
export const getServerUrl = (path?: string): string => {
	const route = path ? path : "";

	return process.env.NODE_ENV === "production" ? prodServerUrl + route : devServerUrl + route;
};

/* EROS */
export const prodWebUrl = "https://www.deveelo.com/";
export const devWebUrl = "http://localhost:3000/";

export const getWebUrl = (path?: string): string => {
	const route = path ? path : "";

	return process.env.NODE_ENV === "production" ? prodWebUrl + route : devWebUrl + route;
};
