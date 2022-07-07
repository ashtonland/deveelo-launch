import jwt_decode, { JwtPayload } from "jwt-decode";

let accessToken = "";

export const setAccessToken = (s: string) => {
	accessToken = s;
};

export const getAccessToken = () => {
	return accessToken;
};

//this function returns the jwtpayload (with the logged in user's id)
//it indirectly tells if we are logged in, and alt to the isLoggedIn()
//hook in the userChecks.ts file
export const getPayload = (): string => {
	let payload = null;

	if (accessToken !== "") {
		payload = jwt_decode<JwtPayload>(accessToken);
	}

	return payload;
};
