import { useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import { useFindCardUsersByIdsQuery } from "../../hooks/backend/generated/graphql";
import { SearchUserIdType } from "../../lib/userTypes";

import socialStyles from "../../styles/minor/sociallist.module.css";
import W40UserCard from "../micro/w40UserCard";
import CardList from "./CardList";

interface SocialProps {
	followingIds: string[];
	friendIds: string[];
}

const SocialList = ({ followingIds, friendIds }: SocialProps) => {
	const [following, setfollowing] = useState(true);

	const list = following ? followingIds : friendIds;
	//const list = ["61ce80a545e0518338b75731", "61feb90240e092000442bf65", "62155723b23fea561c6a7cbf"];

	const toggle = (follow: boolean) => {
		setfollowing(follow);
	};

	let showEmpty = list === undefined;
	if (list) {
		showEmpty = list.length === 0;
	}

	const empText = following ? "😿 user is not following anyone" : "💔 user has not friended anyone";
	const empty = <p className="textFade">{empText}</p>;

	return (
		<div className={socialStyles.listContainer}>
			<div className={socialStyles.toggleContainer}>
				<p className={following ? socialStyles.on : socialStyles.off} onClick={() => toggle(true)}>
					Following
				</p>
				<p className={socialStyles.divider}>·</p>
				<p className={following ? socialStyles.off : socialStyles.on} onClick={() => toggle(false)}>
					Friends
				</p>
			</div>

			<div className={socialStyles.list}>{showEmpty ? empty : <CardList size="w40" list={list} />}</div>
		</div>
	);
};

export default SocialList;
