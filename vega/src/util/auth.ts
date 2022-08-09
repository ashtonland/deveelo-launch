import { Response } from "express";
import { sign } from "jsonwebtoken";
import "dotenv/config";

import { UserType } from "../models/User";

export const createAccessToken = (user: UserType): string => {
	//encode the user id and tag into the token. Since this token is accessable on the frontend,
	//and we can decode it their, we will have the unique identifiers on the front to query the
	//database and fetch all the data for the logged in user
	return sign(
		{
			id: user._id,
			tag: user.account.tag,
		},
		process.env.ACCESS_TOKEN_SECRET!,
		{ expiresIn: "15m" } //15 minutes
	);
};

export const createRefreshToken = (user: UserType): string => {
	return sign(
		{
			id: user._id,
			tokenVersion: user.account.tokenVersion,
		},
		process.env.REFRESH_TOEKEN_SECRET!,
		{ expiresIn: "7d" } //7 days
	);
};

export const sendRefreshToken = (res: Response, token: string) => {
	res.cookie("lid", token, {
		path: "/refresh_token",
		httpOnly: true,
		sameSite: "none",
		secure: true,
	});
};
