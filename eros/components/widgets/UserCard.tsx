import CardDetailText from "../micro/CardDetailText";
import FlatButton from "../micro/FlatButton";
import NameGroup from "../micro/NameGroup";
import ProfilePicture from "../micro/ProfilePicture";
import cardStyles from "../../styles/micro/widgetcards.module.css";
import { updateSidebar } from "../../hooks/socialhooks";
import { isLoggedIn } from "../../hooks/userChecks";
import { MyFollowingDocument, useFollowMutation } from "../../hooks/backend/generated/graphql";

interface UserCardProps {
	key: string;
	id: string;
	account: any;
	profile: any;
	status: string;
	following: string[];
	followers: string[];
}

const UserCard = ({ key, id, account, profile, status, following, followers }: UserCardProps) => {
	const loggedIn = isLoggedIn();
	//for following functionality
	const [followUser] = useFollowMutation({ refetchQueries: [{ query: MyFollowingDocument }] });

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

	//check if we follow this person
	const disable = loggedIn ? following.includes(id) : false;

	const followsYou = loggedIn ? followers.includes(id) : false;

	return (
		<div className={cardStyles.card}>
			<div className={cardStyles.linkgroup} onClick={() => changeSidebar(account.tag)}>
				<ProfilePicture size="w28" source={profile.pictureUrl} status={status} isActivitybar={true} />
				<div className={cardStyles.textgroup}>
					<NameGroup username={account.username} size={5} badges={profile.badges} showBadges={true} outline={true} disableSpacer={true} />
					{followsYou ? <CardDetailText text="Follows you" /> : null}
				</div>
			</div>
			<div className={cardStyles.buttonContainer}>
				<FlatButton
					disabled={disable}
					text="Follow"
					disabledText="Following"
					color="#6360EC"
					shadow="0px 0.375em 1.875em rgba(99, 96, 236, 0.2)"
					action={{
						function: () => handleFollow(id),
						options: {
							disableAfter: loggedIn,
						},
					}}
				/>
			</div>
		</div>
	);
};

export default UserCard;
