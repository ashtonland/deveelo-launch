import { SearchUserType } from "../../lib/userTypes";
import searchStyles from "../../styles/minor/search.module.css";
import NameGroup from "./NameGroup";
import ProfilePicture from "./ProfilePicture";

const Result = ({ account, profile, status }: SearchUserType) => {
	return (
		<button className={searchStyles.personCard} onClick={() => window.location.assign(`/${account.tag}`)}>
			<div className={searchStyles.resPic}>
				<ProfilePicture size="w28" source={profile.pictureUrl} status={status} />
			</div>
			<div className={searchStyles.nameTagGroup}>
				<NameGroup username={account.username} size={6} showBadges={true} badges={profile.badges} />
				<p className={searchStyles.tag}>@{account.tag}</p>
			</div>
		</button>
	);
};

export default Result;
