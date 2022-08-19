import Meta from "../components/micro/Meta";

export default function Devlogs() {
	const title = "Devlogs - Deveelo";

	return (
		<Meta
			title={title}
			description="Live betas, groups with likeminded game devleopers and their latest updates in realtime - it can all be found here on Deveelo, the social platform for game developers and artists"
			image="/banners/deveelobanner.png"
			showBanner={true}
			color="#f54278"
		/>
	);
}
