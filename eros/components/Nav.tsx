import ProfilePicture from "./micro/ProfilePicture";
import TextButton from "./micro/TextButton";
import IconButton from "./micro/IconButton";
import Searchbar from "./minor/Searchbar";
import navStyles from "../styles/nav.module.css";
import isLuna from "../hooks/isLuna";
import { useMyNameAndPfpQuery } from "../hooks/backend/generated/graphql";
import sizeStyle from "../lib/sizeStyle";

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
				<Searchbar />
				<div className={navStyles.iconsPlacer}>
					<div className={navStyles.iconsWrapper}>
						<IconButton src="/resources/moon.svg" width="1.875em" height="1.875em" paddingTB={0.1875} paddingLR={0.1875} />
					</div>
					<div className={navStyles.profWrapper}>
						<div className={navStyles.buttonWrapper}>
							<TextButton colorKey="gold" text="Login" action="/login" outline={true} large={true} />
						</div>
						<div className={navStyles.buttonWrapper}>
							<TextButton colorKey="gold" text="Sign up" action="/register" flat={true} large={true} />
						</div>
					</div>
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
					{/* Theme & Notif Buttons */}
					<Searchbar />
					<div className={navStyles.iconsPlacer}>
						<div className={navStyles.iconsWrapper}>
							<IconButton src="/resources/moon.svg" width="1.875em" height="1.875em" paddingTB={0.1875} paddingLR={0.1875} />
							<IconButton src="/resources/bellout.svg" width="1.875em" height="1.875em" paddingTB={0.1875} paddingLR={0.1875} />
						</div>
					</div>
					<div className={navStyles.profWrapper}>
						<div className={navStyles.profile}>
							<p className={navStyles.name}>{user.account.username}</p>
							<div className={navStyles.pfpContainer}>
								<ProfilePicture size="w24" source={user.profile.pictureUrl} />
							</div>
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
				<a href="/">
					<img style={sizeStyle(2.813, 2.813)} src="/resources/greylogo.svg" alt="Deveelo" />
				</a>
			</div>
			{profile}
		</nav>
	);
};

export default Nav;
