import { model, Schema } from "mongoose";

const postSchema = new Schema({
	imageUrls: [String],
	body: String,
	tags: [String],
	createdAt: String,
	user_id: Schema.Types.ObjectId,
	comments: [
		{
			body: String,
			imageUrl: String,
			user: {
				username: String,
				tag: String,
				pictureUrl: String,
				status: String,
			},
		},
	],
	likes: [
		{
			user: {
				username: String,
				tag: String,
				pictureUrl: String,
				status: String,
			},
			createdAt: String,
		},
	],
});

export interface PostType {
	imageUrls: [string];
	body: string;
	tags: [string];
	createdAt: string;
	user_id: Schema.Types.ObjectId;
	comments: [
		{
			body: string;
			imageUrl: string;
			user: {
				username: string;
				tag: string;
				pictureUrl: string;
				status: string;
			};
		}
	];
	likes: [
		{
			user: {
				username: string;
				tag: string;
				pictureUrl: string;
				status: string;
			};
			createdAt: string;
		}
	];
}

export default model("Post", postSchema);
