import Meta from "../components/micro/Meta";
import MiddleBar from "../components/MiddleBar";
import PostArea from "../components/posts/PostArea";
import { PostFeed } from "../components/posts/PostFeed";

import { isLoggedIn } from "../hooks/userChecks";
import feedStyles from "../styles/posts/feed.module.css";

let notifEmojis = new Map<string, string>([
	["gift", "🎁"],
	["update", "🎀"],
	["message", "🔥"],
	["friend", "💝"],
	["views", "🔴"],
]);

export default function Home() {
	const loggedIn = isLoggedIn();
	const notifs: string[] = [];

	const title = notifs.length > 0 ? `Deveelo | ${notifEmojis.get(notifs[0]) + notifs.length}` : "Deveelo - The Social Platform for Gamedevs";

	return (
		<>
			<Meta
				title={title}
				description="Live betas, groups with likeminded game devleopers and their latest updates in realtime - it can all be found here on Deveelo, the social platform for game developers and artists"
				image="/banners/deveelobanner.png"
				showBanner={true}
				color="#f54278"
			/>
			<MiddleBar padded={true}>
				<div className={feedStyles.nogapwrapper}>
					{loggedIn && <PostArea />}
					<PostFeed amount={10} />
				</div>
			</MiddleBar>
		</>
	);
}
