import "dotenv/config";
import mongoose from "mongoose";

import User, { UserType } from "../models/User";

export const updateField = async (): Promise<void> => {
	console.log("🍿 Command Started");

	//Get all users - FOR PER-USER
	const users: UserType[] = await User.find({});
	console.log("🐲 All Users Retrieved");

	try {
		//SET TO THE SAME FOR ALL USERS
		//await User.updateMany({}, { $set: { "profile.bannerUrl": `/banners/image_${Math.floor(Math.random() * 4)}.webp` } });
		//console.log(`📁 - Successfully changed field for all users (same value)`);

		//ALLOW FOR PER-USER VALUES
		users.forEach(async (user) => {
			await User.findByIdAndUpdate(user._id, { $set: { "profile.bannerUrl": `/banners/image_${Math.floor(Math.random() * 4)}.webp` } }, { useFindAndModify: false });
			console.log(`😎 Field Updated for: ${user.account.tag}`);
		});

		console.log(`✅ - Successfully changed field for ${users.length} users`);
		return;
	} catch (error) {
		console.log(error);
		console.log(`⛔ - Error updating field`);
	}
};

mongoose
	.connect(process.env.MONGODB_KEY!, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(async () => {
		await updateField();
	});
