import navStyles from "../styles/nav.module.css";
import Link from "next/link";
import TitleMenu from "./minor/TitleMenu";
import isLuna from "../hooks/isLuna";

const Nav = ({ sidebarSpacing }: { sidebarSpacing: boolean }) => {
	return (
		<nav className={sidebarSpacing ? (isLuna() ? navStyles.nav : navStyles.nav_full) : isLuna() ? navStyles.navNoSpace : navStyles.navNoSpace_full}>
			<div className={navStyles.wrapper}>
				{isLuna() ? <TitleMenu /> : null}
				<ul>
					<li className={navStyles.boldTitle}>
						<Link href="/">Deveelo</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
