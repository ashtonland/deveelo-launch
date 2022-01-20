import { useMyAccountMinProfileQuery } from "../../hooks/backend/generated/graphql";
import sidebarStyles from "../../styles/sidebar.module.css";

const account = () => {
	const { data, loading, error } = useMyAccountMinProfileQuery();

	if (loading && !data) {
		return <div>fetching data...</div>;
	} else if (error) {
		console.log("error is: " + error);
		return <div>Error occured</div>;
	}

	const user = data.myAccount;

	return (
		<div>
			<h1>Your Data</h1>
			<p>{JSON.stringify(user)}</p>
		</div>
	);
};

export default account;
