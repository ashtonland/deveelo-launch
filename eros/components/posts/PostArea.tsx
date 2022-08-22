import postStyles from "../../styles/posts/postarea.module.css";
import ProfilePicture from "../micro/ProfilePicture";

import { useMyPfpAndStatusQuery } from "../../hooks/backend/generated/graphql";
import { isLoggedIn } from "../../hooks/userChecks";
import IconButton from "../micro/IconButton";
import { useEffect, useState } from "react";

const PostArea = () => {
	//state management
	const [postText, setPostText] = useState("");

	useEffect(() => {
		const textarea = document.querySelector("#postarea");
		textarea?.addEventListener("input", autoResize, false);

		function autoResize() {
			this.style.height = "auto";
			this.style.height = this.scrollHeight + "px";
		}

		return () => {
			// second
		};
	}, [postText]);

	//extra checks even though this component is only loaded if logged in
	const loggedIn = isLoggedIn();
	const { data, loading, error } = loggedIn ? useMyPfpAndStatusQuery() : { data: undefined, loading: undefined, error: undefined };

	if ((loading && !data) || !loggedIn) {
		return <div></div>;
	}
	if (error) {
		console.log("error is: " + error);
		return <div>Error occured</div>;
	}

	const user = data.myAccount;

	return (
		<div className={postStyles.wrapper}>
			<ProfilePicture size="w32" source={user.profile.pictureUrl} status={user.status} />
			<form className={postStyles.form} action="">
				<div className={postStyles.textbox}>
					<textarea name="post" id="postarea" className={postStyles.input} placeholder="What have you been working on?" onChange={(e) => setPostText(e.target.value)} />
					{/* <input className={postStyles.input} type="text" /> */}
					<IconButton src="/resources/post_emoji.svg" width="1.3em" height="1.3em" paddingLR={0} paddingTB={0} hoverFxOff={true} action={undefined} />
				</div>
			</form>
		</div>
	);
};

export default PostArea;
