import IconHeader from "./IconHeader";
import UserCard from "./UserCard";
import widgetStyles from "../../styles/minor/widget.module.css";

import { useSampleUsersQuery, useMyFollowingQuery, useFollowMutation, MyFollowingDocument } from "../../hooks/backend/generated/graphql";
import { SearchUserIdType } from "../../lib/userTypes";
import { sortByStatus } from "../../hooks/sortUsers";
import { isLoggedIn } from "../../hooks/userChecks";

const PeopleWidget = ({ key, count }: { key: string; count: number }) => {
	const loggedIn = isLoggedIn();

	//fetch our follower & following id lists + a sample of users
	const { data: myData, loading: myLoading, error: myError } = useMyFollowingQuery();
	const { data, loading, error } = useSampleUsersQuery({
		variables: {
			amount: count,
		},
		fetchPolicy: "no-cache",
	});

	if (loading && !data) {
		return <div />;
	}
	if (error) {
		return <div>Error occurred</div>;
	}

	if (loggedIn) {
		// only check for our data fetch as well if we are logged in
		if (myLoading && !myData) return <div />;
		if (myError) return <div>Error occurred</div>;
	}

	//get the sampled users & order by status
	const users = data.randomUsers as SearchUserIdType[];
	const sortedUsers = sortByStatus(users);

	//fetch who we are following, so we don't show the follow button
	const followingList = loggedIn ? myData.myAccount.profile.followingIds : undefined;
	//same idea for followers, for the follows you
	const followerList = loggedIn ? myData.myAccount.profile.followerIds : undefined;

	return (
		<div className={widgetStyles.peoplewidget}>
			<IconHeader type="widget" src="/resources/person.svg" color="purple" text="People" />
			<div className={widgetStyles.list}>
				{sortedUsers.map((user) => (
					<UserCard
						key={users.indexOf(user).toString()}
						id={user._id}
						account={user.account}
						profile={user.profile}
						status={user.status}
						following={followingList}
						followers={followerList}
					/>
				))}
			</div>
		</div>
	);
};

export default PeopleWidget;
