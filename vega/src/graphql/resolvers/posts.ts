import Post from "../../models/Post";

const postsResolvers = {
	Query: {
		getPosts: async () => {
			try {
				const posts = await Post.find();
				return posts;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};

export default postsResolvers;
