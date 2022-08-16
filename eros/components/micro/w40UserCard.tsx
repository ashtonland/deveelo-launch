import IconButton from "./IconButton";
import NameGroup from "./NameGroup";
import ProfilePicture from "./ProfilePicture";
import w40styles from "../../styles/micro/w40.module.css";
import cardStyles from "../../styles/micro/widgetcards.module.css";

import { MyFollowingDocument, useFollowMutation, useUnfollowMutation } from "../../hooks/backend/generated/graphql";
import { updateSidebar } from "../../hooks/socialhooks";
import { SearchAccountType, SearchProfileType } from "../../lib/userTypes";
import { isLoggedIn } from "../../hooks/userChecks";
import CardDetailText from "./CardDetailText";

interface CardProps {
	key: string;
	myId: string;
	userId: string;
	account: SearchAccountType;
	profile: SearchProfileType;
	status: "online" | "idle" | "dnd" | "offline";
	following: string[];
	followers: string[];
}

const W40UserCard = ({ key, myId, userId, account, profile, status, following, followers }: CardProps) => {
	const [followUser] = useFollowMutation({ refetchQueries: [{ query: MyFollowingDocument }] });
	const [unfollowUser] = useUnfollowMutation({ refetchQueries: [{ query: MyFollowingDocument }] });

	const loggedIn = isLoggedIn();

	const changeSidebar = (tag: string) => {
		if (!tag) {
			return;
		}
		const storage = window.localStorage;
		storage.setItem("side_prof", tag);

		updateSidebar(tag);
	};

	const handleFollow = async (id: string) => {
		try {
			const response = await followUser({
				variables: {
					targetId: id,
				},
			});

			// if (response && response.data) {
			// 	//check if the operation went through w/o errors
			// 	if (response.data.follow.success) {
			// 		//not needed in this instance
			// 	}
			// }
		} catch (error) {
			console.log(error);
		}
		return;
	};

	const handleUnfollow = async (id: string) => {
		try {
			const response = await unfollowUser({
				variables: {
					targetId: id,
				},
			});

			// if (response && response.data) {
			// 	//check if the operation went through w/o errors
			// 	if (response.data.unfollow.success) {
			// 		//not needed
			// 	}
			// }
		} catch (error) {
			console.log(error);
		}

		return;
	};

	//check if we follow this person
	const alreadyFollow = loggedIn ? following.includes(userId) : false;

	const followsYou = loggedIn ? followers.includes(userId) : false;

	return (
		<div className={w40styles.cardwrapper}>
			<div className="fitfillcenter">
				<div className={cardStyles.linkgroup} onClick={() => changeSidebar(account.tag)}>
					<div className={w40styles.namepicWrapper}>
						<ProfilePicture size="w32" source={profile.pictureUrl} status={status} />
						<div className={w40styles.nameWrapper}>
							<NameGroup username={account.username} size={4} badges={profile.badges} disableSpacer={true} showBadges={true} outline={true} />
							{followsYou && <CardDetailText text="Follows you" larger={true} />}
						</div>
					</div>
				</div>
				{myId !== userId && (
					<div className={w40styles.buttonContainer}>
						<IconButton
							src="/resources/offbell.svg"
							activesrc="/resources/onbell.svg"
							width="2rem"
							height="2rem"
							paddingLR={0.375}
							paddingTB={0.375}
							startActive={alreadyFollow}
							action={{
								activeAction: () => handleUnfollow(userId),
								inactiveAction: () => handleFollow(userId),
								options: {
									dangerous: true,
									toggleActive: true,
								},
							}}
							disabled={!loggedIn}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default W40UserCard;
