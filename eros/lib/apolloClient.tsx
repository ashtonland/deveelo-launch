import { useMemo } from "react";
import { ApolloClient, InMemoryCache, NormalizedCacheObject, from, HttpLink, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { createUploadLink } from "apollo-upload-client";
import jwtDecode, { JwtPayload } from "jwt-decode";

import { getAccessToken, setAccessToken } from "../accessToken";

/* Vars */
const serverUrl = process.env.NODE_ENV === "production" ? "https://vega-deployment.herokuapp.com/graphql" : "http://localhost:4000/graphql";

/* Communication Links*/

const requestLink = new ApolloLink((operation, forward) => {
	const accessToken = getAccessToken();

	if (accessToken) {
		operation.setContext(({ headers }) => ({
			headers: {
				authorization: `bearer ${accessToken}`,
				...headers,
			},
		}));
	}
	return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	console.log(graphQLErrors);
	console.log(networkError);
});

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === "undefined", // automatically set to true for SSR (on per-oage basis)
		link: from([
			new TokenRefreshLink({
				//when access token jwt expires, fetch new one from server
				accessTokenField: "accessToken",
				isTokenValidOrUndefined: () => {
					const token = getAccessToken();

					if (!token) {
						return true;
					}

					try {
						const { exp } = jwtDecode<JwtPayload>(token);
						if (Date.now() >= exp * 1000) {
							return false;
						} else {
							return true;
						}
					} catch {
						return false;
					}
				},
				fetchAccessToken: () => {
					return fetch(process.env.NODE_ENV === "production" ? "https://vega-deployment.herokuapp.com/refresh_token" : "http://localhost:4000/refresh_token", {
						method: "POST",
						credentials: "include",
						mode: "cors",
					});
				},
				handleFetch: (accessToken) => {
					setAccessToken(accessToken);
				},
				handleError: (err) => {
					console.warn("Your refresh token is invalid. Try to relogin");
					console.error(err);
				},
			}),
			onError(({ graphQLErrors, networkError }) => {
				console.log(graphQLErrors);
				console.log(networkError);
			}),
			errorLink,
			requestLink,
			//@ts-ignore
			createUploadLink({
				uri: serverUrl,
				credentials: "include",
			}),
			// new HttpLink({
			// 	uri: serverUrl,
			// 	credentials: "include",
			// }),
		]),
		cache: new InMemoryCache({
			typePolicies: {
				User: {
					merge(existing, incoming, { mergeObjects }) {
						if (!incoming._id) {
							return existing;
						}
						// Correct, thanks to invoking nested merge functions.
						return mergeObjects(existing, incoming);
					},
				},
				U_Account: {
					keyFields: ["tag"],
				},
			},
		}),
	});
}

export function initializeApollo(initialState = null) {
	const _apolloClient = apolloClient ?? createApolloClient();

	// If your page has Next.js data fetching methods that use Apollo Client,
	// the initial state gets hydrated here
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = _apolloClient.extract();

		// Restore the cache using the data passed from
		// getStaticProps/getServerSideProps combined with the existing cached data
		_apolloClient.cache.restore({ ...existingCache, ...initialState });
	}

	// For SSG and SSR always create a new Apollo Client
	if (typeof window === "undefined") return _apolloClient;

	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient;
	return _apolloClient;
}

export function useApollo(initialState: any) {
	const store = useMemo(() => initializeApollo(initialState), [initialState]);
	return store;
}
