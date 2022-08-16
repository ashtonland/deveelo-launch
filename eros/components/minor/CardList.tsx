import W40UserCard from "../micro/w40UserCard";

import { useFindCardUsersByIdsQuery, useMyFollowingQuery } from "../../hooks/backend/generated/graphql";
import { SearchUserIdType } from "../../lib/userTypes";
import { getPayload } from "../../accessToken";
import { isLoggedIn } from "../../hooks/userChecks";

interface CardListProps {
	size: "w40";
	list: string[];
}
const CardList = ({ size, list }: CardListProps) => {
	let content: any;
	let userList: SearchUserIdType[] = [];

	//my data (used to hide follow button on our own card)
	//if not .tag, payload will be null
	const loggedIn = isLoggedIn();
	const payload: any = getPayload();

	//fetch our follower & following id lists + a sample of users
	const { data: myData, loading: myLoading, error: myError } = loggedIn ? useMyFollowingQuery() : { data: undefined, loading: undefined, error: undefined };
	//fetch follow/friend user data to display
	const { data, loading, error } = useFindCardUsersByIdsQuery({ variables: { idList: list } });

	if (loading && !data) {
		return null;
	} else {
		if (error) {
			return <p>Error occurred in fetching...</p>;
		}

		userList = data.findUsersById as SearchUserIdType[];
	}

	if (loggedIn) {
		// only check for our data fetch as well if we are logged in
		if (myLoading && !myData) return <div />;
		if (myError) return <div>Error occurred</div>;
	}

	//fetch who we are following, so we show the filled icon at the start (we already follow them)
	const followingList = loggedIn ? myData.myAccount.profile.followingIds : undefined;
	//same idea for followers, for the follows you
	const followerList = loggedIn ? myData.myAccount.profile.followerIds : undefined;

	switch (size) {
		case "w40":
			content = (
				<>
					{userList.map((user) => (
						<W40UserCard
							key={userList.indexOf(user).toString()}
							myId={payload?.id}
							userId={user._id}
							account={user.account}
							profile={user.profile}
							status={user.status}
							following={followingList}
							followers={followerList}
						/>
					))}
				</>
			);
			break;

		default:
			break;
	}
	return content;
};

export default CardList;
