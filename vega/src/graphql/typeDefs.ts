import gql from "graphql-tag";

export const typeDefs = gql`
	# The implementation for this scalar is provided by the
	# 'GraphQLUpload' export from the 'graphql-upload' package
	# in the resolver map in resolvers/index.ts
	scalar Upload

	#  note  Types
	#file uploads
	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}
	type UploadResult {
		user: User!
		file: File!
		doc: KeyFields
	}
	type KeyFields {
		body: String!
		text2: String
	}
	input ExtraData {
		field1: String
		field2: [String]
		field3: String
	}

	#posting
	type Post {
		_id: ID!
		imageUrls: [String!]!
		body: String
		tags: [String]
		createdAt: String!
		user_id: ID!
		comments: [Comment]!
		likes: [Like]!
	}
	type Comment {
		body: String!
		imageUrl: String
		user: CUser!
	}
	type CUser {
		username: String!
		tag: String!
		pictureUrl: String!
	}
	type Like {
		user: CUser!
		createdAt: String!
	}

	#general
	type LoginResponse {
		accessToken: String!
		user: User!
	}
	#user types
	type U_Account {
		username: String!
		tag: String!
		short: String!
		password: String!
		email: String!
		createdAt: String!
		lastOnline: String!
		private: Boolean!
		blockedIds: [String]!
		tokenVersion: Int!
		pro: Boolean!
	}
	type U_Profile {
		bannerUrl: String!
		pictureUrl: String!
		description: String!
		followingIds: [String]!
		followerIds: [String]!
		friendIds: [String]!
		friendRqIds: [String]!
		badges: [String]!
		linkedProfiles: [String]!
	}
	type U_Social {
		postIds: [String]!
		blogIds: [String]!
		groupIds: [String]!
		betaIds: U_BetaIds!
		chatIds: [String]!
	}
	type U_BetaIds {
		hostedIds: [String]!
		joinedIds: [String]!
	}

	# stripped for profile edit
	type PUser {
		_id: ID!
		account: PAccount!
		profile: PProfile!
	}

	type PAccount {
		username: String!
		tag: String!
	}

	type PProfile {
		bannerUrl: String!
		pictureUrl: String!
		description: String!
	}

	# all types
	type User {
		_id: ID!
		account: U_Account!
		profile: U_Profile!
		status: String!
		social: U_Social!
	}

	type BoolRes {
		success: Boolean!
	}

	# note  Queries (searches)
	type Query {
		getPosts(number: Int!): [Post]!
		getPostsByTag(tag: String!, number: Int!): [Post]!
		myAccount: User
		findUserByTag(tag: String!): User!
		findUsersById(ids: [String!]!): [User]!
		randomUser: User!
		randomUsers(count: Int!): [User]!
		allUsers: [User]!
	}

	# note  Mutations (read/write/updates)
	type Mutation {
		register(email: String!, password: String!): LoginResponse!
		login(input: String!, password: String!): LoginResponse!
		logout: Boolean!
		follow(id: String!): BoolRes
		unfollow(id: String!): BoolRes
		updateProfile(name: String, tag: String, description: String): User!
		singleUpload(file: Upload!, type: String!, edata: ExtraData): UploadResult!
	}
`;
