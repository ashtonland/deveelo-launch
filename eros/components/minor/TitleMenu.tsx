import getAppVersion from "../../hooks/getVersion";
import navStyles from "../../styles/nav.module.css";

const TitleMenu = () => {
	return (
		<div className={navStyles.menubar}>
			<p className={navStyles.menuTitle}>v{getAppVersion()}</p>
		</div>
	);
};

export default TitleMenu;
