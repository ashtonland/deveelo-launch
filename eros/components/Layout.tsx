import { useQuery, gql, NetworkStatus } from "@apollo/client";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import Meta from "./micro/Meta";
import Nav from "./Nav";
const DesktopSidebar = dynamic(() => import("./Sidebar"), { ssr: false });
import FullActivityBar from "./ActivityBar";
import styles from "../styles/Layout.module.css";
import useScreenType from "../hooks/useScreenType";
import { useGetPostsQuery } from "../hooks/backend/generated/graphql";
import onConnectionError from "../hooks/popups/connectionError";
import { getAccessToken } from "../accessToken";
import { useState } from "react";
const SideImage = dynamic(() => import("./SideImage"), { ssr: false });

interface layoutProps {
	children?: any;
	route: string;
	showSidebar: boolean;
	showActivityBar: boolean;
	showNav: boolean;
	useWide: boolean;
}

const Layout = ({ children, route, showSidebar, showActivityBar, showNav, useWide }: layoutProps) => {
	const screenType: string = useScreenType();
	const router = useRouter();
	const [reloaded, setReloaded] = useState(false);

	let content: any = null;
	let text: any;
	let popup: any = null;
	let handledError: boolean = false;

	//const { loading, error, data } = useMyAccountApsMinQuery({ fetchPolicy: "network-only" });

	//console.log(data, error, loading);

	text = "hi";
	const error = false;
	const loading = false;

	// if (loading && !data) {
	// 	text = "loading...";
	// 	handledError = false;
	// } else {
	// 	text = JSON.stringify(data?.myAccount?.account?.username);
	// 	//text = JSON.stringify(data.getPosts);
	// 	if (error && !handledError) {
	// 		handledError = true;
	// 		const accessToken = getAccessToken();
	// 		if (accessToken && accessToken !== "" && !reloaded) {
	// 			setReloaded(true);
	// 			router.reload();
	// 		}

	// 		popup = onConnectionError(error);
	// 	}
	// }

	switch (screenType) {
		case "full":
			content = (
				<>
					{showNav && (showSidebar ? <Nav sidebarSpacing={true} /> : <Nav sidebarSpacing={false} />)}

					{showSidebar && <DesktopSidebar />}

					{showActivityBar && (showNav ? <FullActivityBar topSpacing={true} /> : <FullActivityBar topSpacing={false} />)}

					{useWide && <SideImage route={route} />}
					<div className={useWide ? styles.containerWide : styles.container}>
						<main className={styles.main}>
							{/* <h2>Full</h2>
							<p>Logged in user: {error && !loading ? error : text}</p> */}
							{children}
						</main>
					</div>
				</>
			);
			break;

		case "halfActivityBar":
			content = (
				<>
					{showNav && (showSidebar ? <Nav sidebarSpacing={true} /> : <Nav sidebarSpacing={false} />)}

					{showSidebar && <DesktopSidebar />}

					{showActivityBar && (showNav ? <FullActivityBar topSpacing={true} /> : <FullActivityBar topSpacing={false} />)}

					<div className={useWide ? styles.containerWide : styles.container}>
						<main className={styles.main}>
							{/* <h2>half activity bar</h2>
							<p>Logged in user: {error && !loading ? error : text}</p> */}
							{children}
						</main>
					</div>
				</>
			);
			break;
		case "tablet":
			content = (
				<>
					{showNav && (showSidebar ? <Nav sidebarSpacing={true} /> : <Nav sidebarSpacing={false} />)}

					{showSidebar && <DesktopSidebar />}

					{showActivityBar && (showNav ? <FullActivityBar topSpacing={true} /> : <FullActivityBar topSpacing={false} />)}

					<div className={useWide ? styles.containerWide : styles.container}>
						<main className={styles.main}>
							{/* <h2>tablet</h2>
							<p>Logged in user: {error && !loading ? error : text}</p> */}
							{children}
						</main>
					</div>
				</>
			);
			break;
		case "mobile":
			content = (
				<>
					{showNav && (showSidebar ? <Nav sidebarSpacing={true} /> : <Nav sidebarSpacing={false} />)}

					{showActivityBar && (showNav ? <FullActivityBar topSpacing={true} /> : <FullActivityBar topSpacing={false} />)}

					<div className={useWide ? styles.containerWide : styles.container}>
						<main className={styles.main}>
							<h2>mobile</h2>
							{children}
						</main>
					</div>
				</>
			);
			break;
	}

	return (
		<>
			<Meta />
			<div>{content}</div>
		</>
	);
};

export default Layout;
