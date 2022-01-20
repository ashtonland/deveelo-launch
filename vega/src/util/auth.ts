import { Response } from "express";
import { sign } from "jsonwebtoken";
import "dotenv/config";

import { UserType } from "../models/User";

export const createAccessToken = (user: UserType): string => {
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
		httpOnly: true, //  development  set domain & path
		sameSite: "none",
		secure: true,
	});
};
