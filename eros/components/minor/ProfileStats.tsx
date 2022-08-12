import statStyles from "../../styles/minor/profilestats.module.css";

interface StatsProps {
	following: number;
	followers: number;
	posts: number;
}

const ProfileStats = ({ following, followers, posts }: StatsProps) => {
	console.log(posts);

	return (
		<div className={statStyles.largeWrapper}>
			<div className={statStyles.item}>
				{/* POSTS */}
				<p className={statStyles.statistic}>{posts}</p>
				<p className={statStyles.label}>Posts</p>
			</div>
			<div className={statStyles.divider} />
			<div className={statStyles.item}>
				{/* FOLLOWERS */}
				<p className={statStyles.statistic}>{followers}</p>
				<p className={statStyles.label}>Followers</p>
			</div>
			<div className={statStyles.divider} />
			<div className={statStyles.item}>
				{/* FOLLOWING */}
				<p className={statStyles.statistic}>{following}</p>
				<p className={statStyles.label}>Following</p>
			</div>
		</div>
	);
};

export default ProfileStats;
