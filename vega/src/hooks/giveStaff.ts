import "dotenv/config";
import mongoose from "mongoose";

import User, { UserType } from "../models/User";

const userTag = "Justin"; //the tag used to find the user
const badge = "staff";

export const revokeRefreshTokensForUser = async (tag: string): Promise<void> => {
	const user: UserType = await User.findOne({ "account.tag": tag });

	if (!user) {
		return console.log(`⛔ - no user found with tag: ${tag}`);
	}

	try {
		await User.updateOne({ "account.tag": tag }, { $addToSet: { "profile.badges": badge } }, { useFindAndModify: false });
		console.log(`📁 - Successfully add badge --${badge}-- to user: ${user.account.username} (@${user.account.tag})`);
		return;
	} catch (error) {
		console.log(error);
		console.log(`⛔ - Error updating badge`);
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
