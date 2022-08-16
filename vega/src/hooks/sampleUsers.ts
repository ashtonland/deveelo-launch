import { ObjectID } from "mongodb";
import User, { UserType } from "../models/User";

export const getRandomUser = async (onlyId: boolean): Promise<string | UserType> => {
	//eventually check for pro subscription
	let sampled = await User.aggregate([{ $match: { "profile.description": { $ne: "I'm new to Deveelo!" } } }, { $sample: { size: 1 } }]);

	// if (!sampled) {
	// 	sampled = await User.aggregate([{ $sample: { size: 1 } }]);
	// }
	// const user: UserType = sampled;
	// console.log("user is: " + user.account.tag);

	const user: UserType = sampled[0];

	if (onlyId) {
		return user._id;
	} else {
		return user;
	}
};

export const getRandomUsers = async (amount: number): Promise<UserType[]> => {
	let sampled: UserType[] = await User.aggregate([{ $match: { "profile.description": { $ne: "I'm new to Deveelo!" } } }, { $sample: { size: amount } }]);
	return sampled;
};

export const getRandomUsersBut = async (amount: number, excludeId: string): Promise<UserType[]> => {
	let sampled: UserType[] = await User.aggregate([
		{ $match: { "profile.description": { $ne: "I'm new to Deveelo!" } } },
		{ $match: { _id: { $ne: new ObjectID(excludeId) } } },
		{ $sample: { size: amount } },
	]);
	return sampled;
};
