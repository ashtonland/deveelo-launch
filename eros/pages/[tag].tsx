import { useEffect } from "react";
import { useRouter } from "next/router";

import Meta from "../components/micro/Meta";
import MiddleBar from "../components/MiddleBar";
import { ProfileFeed } from "../components/posts/PostFeed";

import { setSideBarByTag } from "../hooks/setSidebar";
import { metaLoader } from "../hooks/loaders";
import feedStyles from "../styles/posts/feed.module.css";

interface propsType {
	user: any;
}

const ProfilePage = (props: propsType) => {
	const router = useRouter();
	const { tag } = router.query;

	useEffect(() => {
		setSideBarByTag(tag as string);
	}, []);

	const user = props.user; //data.findUserByTag;
	if (!user) {
		return null;
	}
	const postCount = user.social.postIds.length;
	const blogCount = user.social.blogIds.length;
	const followers = user.profile.followerIds.length;
	const following = user.profile.followingIds.length;

	return (
		<>
			<Meta
				title={`${user.account.username} | @${user.account.tag} on Deveelo`}
				description={`${user.profile.description} — ${postCount} posts | ${blogCount} devlogs | ${followers} followers | ${following} following`}
				url={`https://www.deveelo.com/${tag}`}
				image={metaLoader(user.profile.pictureUrl, "uploads")}
			/>

			<MiddleBar padded={true}>
				<div className={feedStyles.nogapwrapper}>
					<ProfileFeed tag={tag as string} amount={10} />
				</div>
			</MiddleBar>
		</>
	);
};

export async function getServerSideProps({ req, _res }) {
	// We make an API call to gather the URLs for our site
	const tag = req.url.substring(1);

	try {
		const link = process.env.NODE_ENV === "production" ? "https://vega.deveelo.com/og?tag=" : "http://localhost:4000/og?tag=";
		const request = await fetch(link + tag, { mode: "cors" });
		const user = await request.json();

		return {
			props: {
				user,
			},
		};
	} catch (error) {
		//typed url wrong, no user exists w/ tag
		const err = "wrong url";
		return {
			props: {
				err,
			},
		};
	}
}

export default ProfilePage;
