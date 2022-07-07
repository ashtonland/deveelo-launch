import { useFindCardUsersByIdsQuery } from "../../hooks/backend/generated/graphql";
import { SearchUserIdType } from "../../lib/userTypes";
import W40UserCard from "../micro/w40UserCard";

interface CardListProps {
	size: "w40";
	list: string[];
}
const CardList = ({ size, list }: CardListProps) => {
	let content: any;
	let userList: SearchUserIdType[] = [];

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

	switch (size) {
		case "w40":
			content = (
				<>
					{userList.map(({ account, profile, status }) => (
						<W40UserCard account={account} profile={profile} status={status} />
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
