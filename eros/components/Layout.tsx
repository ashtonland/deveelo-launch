import { appWindow, PhysicalSize } from "@tauri-apps/api/window";
import { useQuery, gql, NetworkStatus } from "@apollo/client";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Image from "next/image";

import Meta from "./micro/Meta";
import Nav from "./Nav";
import FullActivityBar from "./ActivityBar";
import TitlebarButtons from "./micro/TitlebarButtons";
const DesktopSidebar = dynamic(() => import("./Sidebar"), { ssr: false });
const SideImage = dynamic(() => import("./SideImage"), { ssr: false });
import styles from "../styles/Layout.module.css";
import navStyles from "../styles/nav.module.css";
import useScreenType from "../hooks/useScreenType";
import { useGetPostsQuery } from "../hooks/backend/generated/graphql";
import onConnectionError from "../hooks/popups/connectionError";
import { getAccessToken } from "../accessToken";
import { useEffect, useState } from "react";
import isLuna from "../hooks/isLuna";

interface layoutProps {
	children?: any;
	route: string;
	showSidebar: boolean;
	showActivityBar: boolean;
	showNav: boolean;
	useWide: boolean;
}

const Layout = ({ children, route, showSidebar, showActivityBar, showNav, useWide }: layoutProps) => {
	const storage = window.localStorage;
	// Determins rounded or hard corners in Luna
	if (storage.getItem("fullscreen") === null) {
		// use hard edges by default
		storage.setItem("fullscreen", "true");
	}
	let full = storage.getItem("fullscreen") === "true";

	const screenType: string = useScreenType();
	const luna = isLuna();
	const router = useRouter();
	const [reloaded, setReloaded] = useState(false);
	const [maxed, setmaxed] = useState(null);

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
	let titlebar: any = null;
	let debugT = "";

	if (luna) {
		// set listener when widow size changes to unround or round window corners if maximized
		useEffect(() => {
			appWindow.listen("tauri://resize", ({ event, payload }: { event: any; payload: PhysicalSize }) => {
				const { width, height } = payload;
				console.log(`TRIGGERED\nRes: ${width}x${height}`);

				appWindow.isMaximized().then((max) => {
					console.log(`set max to ${max}`);

					if (maxed !== max) {
						storage.setItem("fullscreen", max.toString());
						setmaxed(max);
					}
				});
			});

			//   return () => {
			// 	appWindow.listeners["tauri://resize"];
			//   };
		}, []);

		full = maxed === true;
	}

	switch (screenType) {
		case "full":
			content = (
				<>
					{showNav && (showSidebar ? <Nav sidebarSpacing={true} /> : <Nav sidebarSpacing={false} />)}
					{showSidebar && <DesktopSidebar hardEdge={full} />}

					{showActivityBar ? <FullActivityBar hardEdge={full} /> : null}

					{useWide && <SideImage route={route} hardEdge={full} />}
					<div className={useWide ? (full ? styles.containerWide_full : styles.containerWide) : styles.container}>
						<main className={styles.main}>
							<p>{JSON.stringify(full)}</p>
							<a href="/login">login</a>
							<a href="/register">register</a>
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

					{showSidebar && <DesktopSidebar hardEdge={full} />}

					{showActivityBar ? <FullActivityBar hardEdge={full} /> : null}

					{useWide && <SideImage route={route} hardEdge={full} />}

					<div className={useWide ? (full ? styles.containerWide_full : styles.containerWide) : styles.container}>
						<main className={styles.main}>
							{/* <h2>half activity bar</h2>
							<p>Logged in user: {error && !loading ? error : text}</p> */}
							<p>{debugT}</p>
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

					{showSidebar && <DesktopSidebar hardEdge={full} />}

					{showActivityBar ? <FullActivityBar hardEdge={full} /> : null}

					{useWide && <SideImage route={route} hardEdge={full} />}
					<div className={useWide ? (full ? styles.containerWide_full : styles.containerWide) : styles.container}>
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

					{showSidebar && <DesktopSidebar hardEdge={full} />}

					{showActivityBar ? <FullActivityBar hardEdge={full} /> : null}

					{useWide && <SideImage route={route} hardEdge={full} />}
					<div className={useWide ? (full ? styles.containerWide_full : styles.containerWide) : styles.container}>
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
			{luna ? <TitlebarButtons /> : null}
			<div>{content}</div>
		</>
	);
};

export default Layout;
