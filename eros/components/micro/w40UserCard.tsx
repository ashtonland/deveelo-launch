import { updateSidebar } from "../../hooks/socialhooks";
import { SearchAccountType, SearchProfileType, SearchStatusType, SearchUserType } from "../../lib/userTypes";
import w40styles from "../../styles/micro/w40.module.css";
import IconButton from "./IconButton";
import NameGroup from "./NameGroup";
import ProfilePicture from "./ProfilePicture";

interface CardProps {
	account: SearchAccountType;
	profile: SearchProfileType;
	status: "online" | "idle" | "dnd" | "offline";
}

const W40UserCard = ({ account, profile, status }: CardProps) => {
	const changeSidebar = (tag: string) => {
		if (!tag) {
			return;
		}
		const storage = window.localStorage;
		storage.setItem("side_prof", tag);

		updateSidebar(tag);
		// rerenderCallback;
	};
	return (
		<div className={w40styles.cardwrapper} onClick={() => changeSidebar(account.tag)}>
			<div className="fitfillcenter">
				<div className={w40styles.namepicWrapper}>
					<ProfilePicture size="w40" source={profile.pictureUrl} status={status} />
					<div className={w40styles.nameWrapper}>
						<NameGroup username={account.username} size={4} badges={profile.badges} showBadges={true} />
					</div>
				</div>
				<div className="fillfillcenterright">
					<IconButton src="/resources/followbell.svg" width="2.625rem" height="2.625rem" paddingLR={0.375} paddingTB={0.375} />
				</div>
			</div>
		</div>
	);
};

export default W40UserCard;
