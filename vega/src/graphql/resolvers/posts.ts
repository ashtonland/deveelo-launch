import { ObjectID } from "mongodb";

import Context from "src/context";
import User, { UserType } from "../../models/User";
import Post from "../../models/Post";

const postsResolvers = {
	Query: {
		getPosts: async (_parent: any, { number }: { number: number }, _context: Context) => {
			try {
				const posts = await Post.find().sort({ _id: -1 }).limit(number);
				return posts;
			} catch (err) {
				throw new Error(err);
			}
		},
		getPostsByTag: async (_parent: any, { tag, number }: { tag: string; number: number }, _context: Context) => {
			const user: UserType = await User.findOne({ "account.tag": tag });

			if (!user) {
				throw new Error("user not found");
			}

			try {
				const posts = await Post.find({ user_id: user._id }).sort({ _id: -1 }).limit(number);
				return posts;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		like: async (_parent: any, { id }: { id: string }, context: Context) => {
			const myID = context.payload!.id;

			try {
				//add our id to the post's list of like(rs)
				await Post.findByIdAndUpdate(new ObjectID(id), { $addToSet: { likes: myID } }, { useFindAndModify: false });

				return {
					success: true,
				};
			} catch (error) {
				throw new Error(error);
			}
		},
		unlike: async (_parent: any, { id }: { id: string }, context: Context) => {
			const myID = context.payload!.id;

			try {
				//add our id to the post's list of like(rs)
				await Post.findByIdAndUpdate(new ObjectID(id), { $pull: { likes: myID } }, { useFindAndModify: false });

				return {
					success: true,
				};
			} catch (error) {
				throw new Error(error);
			}
		},
	},
};

export default postsResolvers;
