import pictureStyles from "../../styles/profilepicture.module.css";
import statusStyles from "../../styles/status.module.css";
import Image from "next/image";

interface profilePicParams {
	size: string;
	source: string;
	status?: string;
}

const ProfilePicture = ({ size, source, status }: profilePicParams) => {
	let content = null;
	let circle = null;

	switch (status) {
		case "online":
			circle = <div className={statusStyles.online} />;
			break;
		case "idle":
			circle = <div className={statusStyles.idle} />;
			break;
		case "dnd":
			circle = <div className={statusStyles.dnd} />;
			break;
		case "offline":
			circle = <div className={statusStyles.offline} />;
			break;
		default:
			break;
	}

	switch (size) {
		case "large":
			content = (
				<div className={pictureStyles.w70}>
					<Image className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status ? <div className={statusStyles.large}>{circle}</div> : null}
				</div>
			);
			break;
		case "w50":
			content = (
				<div className={pictureStyles.w50}>
					<Image className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status ? <div className={statusStyles.large}>{circle}</div> : null}
				</div>
			);
			break;
		case "w40":
			content = (
				<div className={pictureStyles.w40}>
					<Image className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status ? <div className={statusStyles.large}>{circle}</div> : null}
				</div>
			);
			break;
		case "w36":
			content = (
				<div className={pictureStyles.w36}>
					<Image className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status ? <div className={statusStyles.large}>{circle}</div> : null}
				</div>
			);
			break;
		case "w32":
			content = (
				<div className={pictureStyles.w32}>
					<Image className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status ? <div className={statusStyles.large}>{circle}</div> : null}
				</div>
			);
			break;
		case "w28":
			content = (
				<div className={pictureStyles.w28}>
					<Image className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status ? <div className={statusStyles.large}>{circle}</div> : null}
				</div>
			);
			break;
	}

	return content;
};

export default ProfilePicture;
