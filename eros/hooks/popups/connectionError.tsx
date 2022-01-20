import { ApolloError } from "@apollo/client";

const onConnectionError = (error: ApolloError) => {
	let content: any = null;
	//this error stems from inability to connect to the server
	if (error.networkError) {
		content = <></>;
	}
};

export default onConnectionError;
