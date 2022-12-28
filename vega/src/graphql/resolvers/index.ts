//@ts-ignore
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";

import postsResolvers from "./posts";
import userResolvers from "./users";
import uploadsResolvers from "./uploads";

//middle, how resolvers are combined
const resolvers = {
	// This maps the `Upload` scalar to the implementation provided
	// by the `graphql-upload` package.
	Upload: GraphQLUpload,

	Query: {
		...userResolvers.Query,
		...postsResolvers.Query,
	},
	Mutation: {
		...userResolvers.Mutation,
		...uploadsResolvers.Mutation,
		...postsResolvers.Mutation,
	},
};

export default resolvers;
