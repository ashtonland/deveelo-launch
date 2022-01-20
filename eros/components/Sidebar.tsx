import sidebarStyles from "../styles/sidebar.module.css";
import NameGroup from "./micro/NameGroup";
import TextButton from "./micro/TextButton";
import ProfilePicture from "./micro/ProfilePicture";
import Image from "next/image";
import { useMyAccountMinProfileQuery } from "../hooks/backend/generated/graphql";
import { useRouter } from "next/router";

const Sidebar = () => {
	const { data, loading, error } = useMyAccountMinProfileQuery();
	const path = useRouter().route;

	if (loading && !data) {
		return <div>loading...</div>;
	}
	if (error) {
		return <div>An error has occured</div>;
	}

	const user = data.myAccount;
	const link: string = process.env.NODE_ENV === "production" ? `https://www.deveelo.com${user.profile.pictureUrl}` : `http://localhost:3000${user.profile.pictureUrl}`;
	console.log(link);

	return (
		<div className={sidebarStyles.sidebar}>
			{/*Banner*/}
			<div className={sidebarStyles.banner}>
				<Image className={sidebarStyles.bannerImage} alt="profile banner" src="/user_content/p_banners/pinkdunes.png" layout="fill" priority={true} objectFit="cover" />
			</div>
			{/*User Profile*/}
			<div className={sidebarStyles.profileContainer}>
				<div className={sidebarStyles.p_cvlayoutzero}>
					{/*layout group with pfp & followers/ing*/}
					<div className={sidebarStyles.p_chlayout15}>
						<div className={sidebarStyles.p_stats}>
							<p className={sidebarStyles.p_stats_num}>{user.profile.followingIds.length}</p>
							<p className={sidebarStyles.p_stats_label}>Following</p>
						</div>
						<ProfilePicture size="large" source={link} />
						<div className={sidebarStyles.p_stats}>
							<p className={sidebarStyles.p_stats_num}>{user.profile.followerIds.length}</p>
							<p className={sidebarStyles.p_stats_label}>Followers</p>
						</div>
					</div>
					{/*name & badges*/}
					<NameGroup username={user.account.username} size={1} showBadges={true} badges={user.profile.badges} />
					<p className={sidebarStyles.p_tag}>@{user.account.tag}</p>
				</div>

				<p className={sidebarStyles.p_description}>{user.profile.description}</p>

				<div className={sidebarStyles.buttonContainer}>
					<TextButton colorKey="gold" text="Follow" />
					<TextButton colorKey="green" text="Friend" />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
