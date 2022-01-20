import "dotenv/config";
import mongoose from "mongoose";

import User, { UserType } from "../models/User";

const userTag = ""; //the tag used to find the user

export const revokeRefreshTokensForUser = async (tag: string): Promise<void> => {
	const user: UserType = await User.findOne({ "account.tag": tag });

	if (!user) {
		return console.log(`⛔ - no user found with tag: ${tag}`);
	}

	const currVersion: number = user.account.tokenVersion + 1;

	try {
		await User.updateOne({ "account.tag": tag }, { $set: { "account.tokenVersion": currVersion } });
		console.log(`📁 - Successfully changed token version for ${user.account.username} (@${user.account.tag}) to ${currVersion}`);
		return;
	} catch (error) {
		console.log(error);
		console.log(`⛔ - Error updating user token`);
	}
};

mongoose
	.connect(process.env.MONGODB_KEY!, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(async () => {
		await revokeRefreshTokensForUser(userTag);
	});
