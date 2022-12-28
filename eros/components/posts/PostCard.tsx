import Image from "next/image";
import { useState } from "react";

import NameGroup from "../micro/NameGroup";
import ProfilePicture from "../micro/ProfilePicture";
import styles from "../../styles/posts/postcard.module.css";
import { Like, Comment } from "../micro/LabelButtons";

import { postLoader } from "../../hooks/loaders";
import { useFindCardUsersByIdsQuery } from "../../hooks/backend/generated/graphql";
import { timeAgo } from "../../lib/time";
import { PostType } from "../../lib/postTypes";
import { SearchUserIdType } from "../../lib/userTypes";
import { updateSidebar } from "../../hooks/socialhooks";
import { isLoggedIn } from "../../hooks/userChecks";
import { getPayload } from "../../accessToken";

interface PC_Props {
	key: string;
	post: PostType;
}

const PostCard = ({ key, post }: PC_Props) => {
	const [showContent, setShowContent] = useState(false);
	const [fade, setFade] = useState(false);

	const { _id, body, imageUrls, user_id, createdAt, likes, comments, tags } = post;

	const hashtags = tags;
	const showHashtags = hashtags !== null;

	//check if we have already liked this post, so we can initialize
	//the post with the like button active (pink & filled)
	const payload: any = getPayload();
	const myId = payload?.id;

	const alreadyLiked = isLoggedIn() ? likes.includes(myId) : false;

	const { data, loading, error } = useFindCardUsersByIdsQuery({
		variables: {
			idList: [user_id],
		},
	});

	if (loading && !data) {
		return <div />;
	}
	if (error) {
		return <div>Error occurred</div>;
	}

	const user = data.findUsersById[0] as SearchUserIdType;

	//switch sidebar to show post author's profile when name is clicked
	const changeSidebar = (tag: string) => {
		if (!tag) {
			return;
		}
		const storage = window.localStorage;
		storage.setItem("side_prof", tag);

		updateSidebar(tag);
	};

	//toggle the blur area with whatever content may
	//be shown: either the text body or comments
	const toggleContent = () => {
		if (showContent) {
			//user is trying to hide the content
			//1 second delay for the hide animation
			setFade(true);
			setTimeout(() => {
				setShowContent(false);
				setFade(false);
			}, 1000);
		} else {
			//user wants to see the post content
			setShowContent(true);
		}
	};

	return (
		<div className={styles.card}>
			<div className={styles.imageWrapper} onClick={() => toggleContent()}>
				<Image loader={postLoader} src={imageUrls[0]} className={styles.image} layout="fill" priority={true} objectFit="cover" />
				{showContent ? (
					<div className={fade ? styles.blurOut : styles.blurArea}>
						{/* swap out content at this level */}
						<div className={styles.contentWrapper}>
							<p className={styles.postBody}>{body}</p>
							{showHashtags ? (
								<div className={styles.tagList}>
									{hashtags.map((tag) => (
										<p className={styles.hashtag}>{tag}</p>
									))}
								</div>
							) : null}
						</div>
					</div>
				) : null}
			</div>
			{/* Under-image section */}
			<div className={styles.header}>
				<div className={styles.profile} onClick={() => changeSidebar(user.account.tag)}>
					<ProfilePicture source={user.profile.pictureUrl} status={user.status} size="w36c" />
					<div className={styles.nameGroup}>
						<div className={styles.nameWrapper}>
							<NameGroup username={user.account.username} badges={user.profile.badges} size={3} showBadges={true} disableSpacer={true} />
						</div>
						<p className={styles.date}>{timeAgo(createdAt)} ago</p>
					</div>
				</div>
				<div className={styles.buttonGroup}>
					<Like count={likes.length} id={_id} startActive={alreadyLiked} cardType="post" />
					<Comment count={comments.length} id={_id} startActive={false} cardType="post" />
				</div>
			</div>
		</div>
	);
};

export default PostCard;
