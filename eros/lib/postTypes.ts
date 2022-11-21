export interface PostType {
	imageUrls: string[];
	body?: string;
	tags?: string[];
	createdAt: string;
	user_id: string;
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
	likes: [
		{
			user: {
				username: string;
				tag: string;
				pictureUrl: string;
			};
			createdAt: string;
		}
	];
}