import pictureStyles from "../../styles/profilepicture.module.css";
import statusStyles from "../../styles/status.module.css";
import Image from "next/image";

import { bannerLoader } from "../../hooks/loaders";
import { FileSelectArea } from "./FileSelect";

interface profilePicParams {
	size: string;
	source: string;
	status?: string;
	editing?: boolean;
	renderSeed?: number; //used to pas rerender events from sidebar down to pfp
	isActivitybar?: boolean; //we need to use a darker outline to march background
}

const ProfilePicture = ({ size, source, status, editing, renderSeed, isActivitybar }: profilePicParams) => {
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
				//if editting, we clip it so that the darken overlay is a circle (status is hidden when editting so no conflicts)
				<div className={editing ? pictureStyles.w70Clip : pictureStyles.w70}>
					{editing ? <FileSelectArea maxSize="2mb" type="pfp" /> : null}
					<Image loader={bannerLoader} className={editing ? pictureStyles.p_pictureEdit : pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status && !editing ? <div className={statusStyles.large}>{circle}</div> : null}
				</div>
			);
			break;
		case "w50":
			content = (
				<div className={pictureStyles.w50}>
					<Image loader={bannerLoader} className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status ? <div className={statusStyles.large}>{circle}</div> : null}
				</div>
			);
			break;
		case "w40":
			content = (
				<div className={pictureStyles.w40}>
					<Image loader={bannerLoader} className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status ? <div className={statusStyles.w40}>{circle}</div> : null}
				</div>
			);
			break;
		case "w36":
			content = (
				<div className={pictureStyles.w36}>
					<Image loader={bannerLoader} className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status ? <div className={statusStyles.large}>{circle}</div> : null}
				</div>
			);
			break;
		case "w32":
			content = (
				<div className={pictureStyles.w32}>
					<Image loader={bannerLoader} className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status ? <div className={statusStyles.w32}>{circle}</div> : null}
				</div>
			);
			break;
		case "w28":
			content = (
				<div className={pictureStyles.w28}>
					<Image loader={bannerLoader} className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status ? <div className={isActivitybar ? statusStyles.w28activitybar : statusStyles.w28}>{circle}</div> : null}
				</div>
			);
			break;
		case "w24":
			//this is only for the navbar profile picture, so no status support
			content = (
				<div className={pictureStyles.w24}>
					<Image loader={bannerLoader} className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
				</div>
			);
			break;
	}

	return content;
};

export default ProfilePicture;
