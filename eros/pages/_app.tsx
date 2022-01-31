import { AppProps } from "next/app";
import { useApollo } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/router";

import Meta from "../components/micro/Meta";
import Layout from "../components/Layout";
import "../styles/globals.css";
import navStyles from "../styles/nav.module.css";
import { OnNavBlacklist, OnSidebarBlacklist, OnActivityBlacklist, MatchName } from "../lib/routeBlacklists";
import { useEffect, useState } from "react";
import { setAccessToken } from "../accessToken";
import isLuna from "../hooks/isLuna";

const twoColRoutes = ["/login", "/register"];

function MyApp({ Component, pageProps }: AppProps) {
	const apolloClient = useApollo(pageProps.initialApolloState);

	const router = useRouter();
	const currPage = router.pathname;

	// Generate a new AccessToken on Reload
	const [loading, setLoading] = useState(true);

	//get the access token from the server (server will return it)
	useEffect(() => {
		fetch(process.env.NODE_ENV === "production" ? "https://vega-deployment.herokuapp.com/refresh_token" : "http://localhost:4000/refresh_token", {
			method: "POST",
			credentials: "include",
			mode: "cors",
		}).then(async (x) => {
			const { accessToken } = await x.json();
			setAccessToken(accessToken);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return (
			<>
				<Meta />
				<div data-tauri-drag-region className={navStyles.dragBar}></div>

				<div className="full_center">
					<div className="loading"></div>
					<h1 className="delayed">Deveelo</h1>
				</div>
			</>
		);
	}

	return (
		<ApolloProvider client={apolloClient}>
			<Layout
				route={currPage}
				showNav={OnNavBlacklist(currPage)}
				showSidebar={OnSidebarBlacklist(currPage)}
				showActivityBar={OnActivityBlacklist(currPage)}
				useWide={MatchName(currPage, twoColRoutes)}>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	);
}

export default MyApp;
