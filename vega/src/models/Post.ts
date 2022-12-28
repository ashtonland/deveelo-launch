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
			},
		},
	],
	likes: [String],
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
			};
		}
	];
	likes: [string];
}

export default model("Post", postSchema);
