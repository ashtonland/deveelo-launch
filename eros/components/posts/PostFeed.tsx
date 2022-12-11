import { useNewPostsQuery, usePostsByTagQuery } from "../../hooks/backend/generated/graphql";
import { PostType } from "../../lib/postTypes";
import feedStyles from "../../styles/posts/feed.module.css";
import PostCard from "./PostCard";

export const PostFeed = ({ amount }: { amount: number }) => {
	const { data, loading, error } = useNewPostsQuery({
		variables: {
			number: amount,
		},
		fetchPolicy: "no-cache",
	});

	if (loading && !data) {
		return <div />;
	}
	if (error) {
		return <div>Error occurred</div>;
	}

	const posts: PostType[] = data.getPosts as any;

	return (
		<div className={feedStyles.contentContainer}>
			{posts.map((post) => (
				<PostCard key={posts.indexOf(post).toString()} post={post} />
			))}
		</div>
	);
};

export const ProfileFeed = ({ tag, amount }: { tag: string; amount: number }) => {
	const { data, loading, error } = usePostsByTagQuery({
		variables: {
			tag: tag,
			number: amount,
		},
	});

	if (loading && !data) {
		return <div />;
	}
	if (error) {
		return <div>Error occurred</div>;
	}

	const posts: PostType[] = data.getPostsByTag as any;

	return posts.length > 0 ? (
		<div className={feedStyles.contentContainer}>
			{posts.map((post) => (
				<PostCard key={posts.indexOf(post).toString()} post={post} />
			))}
		</div>
	) : (
		<div className={feedStyles.noPostsWrapper}>
			<p className={feedStyles.noPosts}>@{tag} has not made any posts 😢</p>
		</div>
	);
};
