import { useState } from "react";
import { useLikePostMutation, useUnlikePostMutation } from "../../hooks/backend/generated/graphql";
import { isLoggedIn } from "../../hooks/userChecks";
import styles from "../../styles/micro/labelbutton.module.css";
import IconButton from "./IconButton";

interface LikeProps {
	count: number;
	cardType: "post" | "blog";
	id: string;
	startActive: boolean;
}

export const Like = ({ count, cardType, id, startActive }: LikeProps) => {
	const [likes, setLikes] = useState(count);
	const [active, setActive] = useState(startActive); //use for text color

	const [likePost] = useLikePostMutation();
	const [unlikePost] = useUnlikePostMutation();

	//only allow logged-in users to click this button
	const enabled = isLoggedIn();

	const handleLike = async () => {
		try {
			const response = await likePost({
				variables: {
					postId: id,
				},
			});

			if (response && response.data) {
				if (response.data.like.success) {
					setActive(true);
					setLikes(likes + 1);
				}
			}
		} catch (error) {
			console.log(error);
		}
		return;
	};

	const handleUnlike = async () => {
		try {
			const response = await unlikePost({
				variables: {
					postId: id,
				},
			});

			if (response && response.data) {
				if (response.data.unlike.success) {
					setActive(false);
					setLikes(likes - 1);
				}
			}
		} catch (error) {
			console.log(error);
		}
		return;
	};

	const actions = {
		activeAction: () => handleUnlike(),
		inactiveAction: () => handleLike(),
		options: {
			toggleActive: true,
		},
	};

	return (
		<div className={styles.buttonWrapper}>
			<p className={active ? styles.labelActive : styles.label}>{likes}</p>
			<IconButton
				src="/resources/posts/heart.svg"
				activesrc="/resources/posts/heartFilled.svg"
				paddingTB={0.281}
				paddingLR={0.281}
				width="1.969em"
				height="1.969em"
				startActive={startActive}
				spinOnClick={true}
				action={enabled ? actions : undefined}
			/>
		</div>
	);
};

export const Comment = ({ count, cardType, id, startActive }: LikeProps) => {
	const [comments, setComment] = useState(count);
	const [active, setActive] = useState(startActive); //use for text color

	return (
		<div className={styles.buttonWrapper}>
			<p className={active ? styles.labelActive : styles.label}>{comments}</p>
			<IconButton src="/resources/posts/comment.svg" activesrc="/resources/posts/commentOn.svg" paddingTB={0.281} paddingLR={0.281} width="1.969em" height="1.969em" startActive={startActive} />
		</div>
	);
};
