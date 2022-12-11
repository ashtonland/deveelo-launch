import { useState } from "react";
import styles from "../../styles/micro/labelbutton.module.css";
import IconButton from "./IconButton";

interface LikeProps {
	count: number;
	cardType: "post" | "blog";
	startActive: boolean;
}

export const Like = ({ count, cardType, startActive }: LikeProps) => {
	const [likes, setLikes] = useState(count);
	const [active, setActive] = useState(startActive); //use for text color

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
				action={{
					activeAction: () => {
						setActive(false);
						setLikes(likes - 1);
					},
					inactiveAction: () => {
						setActive(true);
						setLikes(likes + 1);
					},
					options: {
						toggleActive: true,
					},
				}}
			/>
		</div>
	);
};

export const Comment = ({ count, cardType, startActive }: LikeProps) => {
	const [comments, setComment] = useState(count);
	const [active, setActive] = useState(startActive); //use for text color

	return (
		<div className={styles.buttonWrapper}>
			<p className={active ? styles.labelActive : styles.label}>{comments}</p>
			<IconButton src="/resources/posts/comment.svg" activesrc="/resources/posts/commentOn.svg" paddingTB={0.281} paddingLR={0.281} width="1.969em" height="1.969em" startActive={startActive} />
		</div>
	);
};
