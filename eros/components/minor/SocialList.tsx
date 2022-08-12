import { useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import socialStyles from "../../styles/minor/sociallist.module.css";
import CardList from "./CardList";

interface SocialProps {
	followingIds: string[];
	friendIds: string[];
}

const SocialList = ({ followingIds, friendIds }: SocialProps) => {
	const [tab, setTab] = useState(1);

	//will be entered as a prop, by passing in the 8 latest post objects and extracting the
	//picture urls from them, those will be used to load the images
	const mediaUrls: string[] = [];

	// since the tab # is an index, we cna use it to get the
	// content by arranging that content in a corresponding array
	const tabData = [friendIds, followingIds, mediaUrls];
	//do the same for the no data messages:
	const emptyData = ["💔 user has not friended anyone", "😿 user is not following anyone", "🥲 user made no posts... yet"];
	const list = tabData[tab];

	let showEmpty = list === undefined;
	if (list) {
		showEmpty = list.length === 0;
	}

	const empty = <p className="textFade">{emptyData[tab]}</p>;

	return (
		<div className={socialStyles.listContainer}>
			<div className={socialStyles.toggleContainer}>
				<p className={tab === 0 ? socialStyles.on : socialStyles.off} onClick={() => setTab(0)}>
					Friends
				</p>
				<p className={tab === 1 ? socialStyles.on : socialStyles.off} onClick={() => setTab(1)}>
					Following
				</p>
				<p className={tab === 2 ? socialStyles.on : socialStyles.off} onClick={() => setTab(2)}>
					Media
				</p>
			</div>

			<div className={socialStyles.list}>{showEmpty ? empty : <CardList size="w40" list={list} />}</div>
		</div>
	);
};

export default SocialList;
