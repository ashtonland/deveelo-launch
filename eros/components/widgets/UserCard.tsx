import cardStyles from "../../styles/micro/widgetcards.module.css";
import NameGroup from "../micro/NameGroup";
import ProfilePicture from "../micro/ProfilePicture";

interface UserCardProps {
	key: string;
	id: string;
	account: any;
	profile: any;
	status: string;
}

const UserCard = ({ key, id, account, profile, status }: UserCardProps) => {
	return (
		<div className={cardStyles.card}>
			<ProfilePicture size="w28" source={profile.pictureUrl} status={status} isActivitybar={true} />
			<NameGroup username={account.username} size={5} badges={profile.badges} showBadges={true} outline={true} disableSpacer={true} />
			<div className="fillfillcenterright"></div>
		</div>
	);
};

export default UserCard;
