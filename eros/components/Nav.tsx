import Link from "next/link";

import TitleMenu from "./minor/TitleMenu";
import ProfilePicture from "./micro/ProfilePicture";
import TextButton from "./micro/TextButton";
import navStyles from "../styles/nav.module.css";
import isLuna from "../hooks/isLuna";
import { useMyNameAndPfpQuery } from "../hooks/backend/generated/graphql";

interface navProps {
	sidebarSpacing: boolean;
	loggedIn: boolean;
}

const Nav = ({ sidebarSpacing, loggedIn }: navProps) => {
	let profile = null;

	if (!loggedIn) {
		// handle logged out users
		profile = (
			<div className={navStyles.rightWrapper}>
				<div className={navStyles.buttonWrapper}>
					<TextButton colorKey="gold" text="Login" action="/login" />
				</div>
			</div>
		);
	} else {
		//user is logged in
		const { data, loading, error } = useMyNameAndPfpQuery();

		if (loading && !data) {
			return <div></div>;
		}
		if (error) {
			console.log("error is: " + error);
			return <div>Error occured</div>;
		}

		const user = data.myAccount;
		//user can be null when auth fails
		if (user) {
			profile = (
				<div className={navStyles.rightWrapper}>
					<div className={navStyles.profile}>
						<p className={navStyles.name}>{user.account.username}</p>
						<div className={navStyles.pfpContainer}>
							<ProfilePicture size="w40" source={user.profile.pictureUrl} />
						</div>
					</div>
				</div>
			);
		}
	}

	return (
		<nav className={sidebarSpacing ? (isLuna() ? navStyles.nav : navStyles.nav_full) : isLuna() ? navStyles.navNoSpace : navStyles.navNoSpace_full}>
			{/* the name & app version */}
			<div className={navStyles.wrapper}>
				{isLuna() ? <TitleMenu /> : null}
				<ul>
					<li className={navStyles.boldTitle}>
						<Link href="/">Deveelo</Link>
					</li>
				</ul>
			</div>
			{profile}
		</nav>
	);
};

export default Nav;
