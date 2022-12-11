import subnavStyles from "../../styles/minor/subnav.module.css";
import SubnavButton from "../micro/SubnavButton";

const SubNav = () => {
	return (
		//sets up the fade placement w/ padding
		<div className={subnavStyles.fadeWrapper}>
			{/* the actual fade */}
			<div className={subnavStyles.fadebox}>
				<div className={subnavStyles.notch}>
					<div className={subnavStyles.buttonList}>
						<SubnavButton src="/resources/home.svg" path="/" key="0" color="linear-gradient(135deg, #FFD74A 0%, #FFB129 100%)" />
						<SubnavButton src="/resources/blog.svg" path="/devlogs" key="1" color="linear-gradient(135deg, #FF6FA3 0%, #FF3358 100%)" />
						<SubnavButton src="/resources/groups.svg" path="/groups" key="2" color="linear-gradient(135deg, #2ED9A6 0%, #00C9C9 100%)" />
						<SubnavButton src="/resources/betas.svg" path="/betas" key="3" color="linear-gradient(135deg, #00D1FF 0%, #3C9EF9 100%)" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SubNav;
