import nameStyles from "../../styles/namegroup.module.css";
import Badge from "./Badge";

interface nameGroupParams {
	username: string;
	size: number;
	showBadges: boolean;
	// this is a space infront of the name to counter the offset of the badges, but
	//if we do not want the name centered or we don't want a space infront (like in
	//the search results), then we disable this auto balancing.
	disableSpacer?: boolean;
	badges?: string[];
	outline?: boolean;
	useh1?: boolean;
}

const NameGroup = ({ username, size, showBadges, disableSpacer, badges, outline, useh1 }: nameGroupParams) => {
	let fontStyle = null;

	if (badges == undefined) {
		badges = [];
	}

	//choose which css styling to use
	switch (size) {
		case 1:
			//Profile name on sidebar
			fontStyle = nameStyles.p_largeText;
			break;
		case 3:
			//post card authors
			fontStyle = nameStyles.p_postText;
			break;
		case 4:
			//sidebar follow/friend list
			fontStyle = nameStyles.p_sociallistText;
			break;
		case 5:
			//activitybar widgets
			fontStyle = nameStyles.p_widgetText;
			break;
		case 6:
			//Search results
			fontStyle = nameStyles.p_searchText;
			break;
		default:
			fontStyle = nameStyles;
			break;
	}

	let content = (
		<>
			<div className={nameStyles.p_container}>
				{showBadges && badges.length > 0 && !disableSpacer ? <div className={nameStyles.largeSpacer}></div> : null}

				{useh1 ? <h1 className={fontStyle}>{username}</h1> : <p className={fontStyle}>{username}</p>}

				{
					//load badges from keys if key list contains keys
					showBadges && badges.length > 0 ? <Badge keys={badges} outline={outline} size={size} /> : null
				}
			</div>
		</>
	);

	return <div>{content}</div>;
};

export default NameGroup;
