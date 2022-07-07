import { getAccessToken } from "../accessToken";

export const isLoggedIn = (): boolean => {
	const token = getAccessToken();
	return token !== "";
};
