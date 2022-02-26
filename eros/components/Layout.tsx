import { appWindow, PhysicalSize } from "@tauri-apps/api/window";
import { useQuery, gql, NetworkStatus } from "@apollo/client";
import router, { useRouter } from "next/router";
import dynamic from "next/dynamic";

import Nav from "./Nav";
import FullActivityBar from "./ActivityBar";
import TitlebarButtons from "./micro/TitlebarButtons";
const DesktopSidebar = dynamic(() => import("./Sidebar"), { ssr: false });
const SideImage = dynamic(() => import("./SideImage"), { ssr: false });
import styles from "../styles/Layout.module.css";
import useScreenType from "../hooks/useScreenType";
import { useGetPostsQuery, useLogoutMutation } from "../hooks/backend/generated/graphql";
import onConnectionError from "../hooks/popups/connectionError";
import { getAccessToken, setAccessToken } from "../accessToken";
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
	const [isLoggedIn, setIsLoggedIn] = useState(getAccessToken() !== "");

	const storage = window.localStorage;
	// Determins rounded or hard corners in Luna
	if (storage.getItem("fullscreen") === null) {
		// use hard edges by default
		storage.setItem("fullscreen", "true");
	}
	let full = storage.getItem("fullscreen") === "true";

	//determine layout type
	const screenType: string = useScreenType();

	//handle loading desktop specific content
	const luna = isLuna();
	const [maxed, setmaxed] = useState(null);

	//TEMPORARY
	const [logout, { client }] = useLogoutMutation();

	let content: any = null;
	let text: any;
	let popup: any = null;
	let handledError: boolean = false;

	text = "hi";

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
					{showNav && (showSidebar ? <Nav sidebarSpacing={true} loggedIn={getAccessToken() !== ""} /> : <Nav sidebarSpacing={false} loggedIn={getAccessToken() !== ""} />)}
					{showSidebar && <DesktopSidebar hardEdge={full} />}

					{showActivityBar ? <FullActivityBar hardEdge={full} /> : null}

					{useWide && <SideImage route={route} hardEdge={full} />}
					<div className={useWide ? (full ? styles.containerWide_full : styles.containerWide) : styles.container}>
						<main className={styles.main}>
							<a href="/register">register</a>
							<a href="/settings/account">your account</a>
							{getAccessToken() ? (
								<button
									onClick={async () => {
										const { data } = await logout();

										if (data) {
											const ok = data.logout;

											if (ok) {
												//logout was successful
												setAccessToken("");
												console.log("access token cleared");

												//clear the cache
												await client!.resetStore();
												await client.clearStore();

												//rerender page
												router.push("/");
											}
										}
									}}>
									Logout
								</button>
							) : null}
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
					{showNav && (showSidebar ? <Nav sidebarSpacing={true} loggedIn={getAccessToken() !== ""} /> : <Nav sidebarSpacing={false} loggedIn={getAccessToken() !== ""} />)}

					{showSidebar && <DesktopSidebar hardEdge={full} />}

					{showActivityBar ? <FullActivityBar hardEdge={full} /> : null}

					{useWide && <SideImage route={route} hardEdge={full} />}

					<div className={useWide ? (full ? styles.containerWide_full : styles.containerWide) : styles.container}>
						<main className={styles.main}>
							{/* <h2>half activity bar</h2>
							<p>Logged in user: {error && !loading ? error : text}</p> */}
							<a href="/register">register</a>
							<a href="/settings/account">your account</a>
							<button
								onClick={async () => {
									await logout();
									setAccessToken("");

									await client!.resetStore();
									if (router.pathname !== "/") {
										router.push("/");
									}
								}}>
								Logout
							</button>
							{children}
						</main>
					</div>
				</>
			);
			break;
		case "tablet":
			content = (
				<>
					{showNav && (showSidebar ? <Nav sidebarSpacing={true} loggedIn={getAccessToken() !== ""} /> : <Nav sidebarSpacing={false} loggedIn={getAccessToken() !== ""} />)}

					{showSidebar && <DesktopSidebar hardEdge={full} />}

					{showActivityBar ? <FullActivityBar hardEdge={full} /> : null}

					{useWide && <SideImage route={route} hardEdge={full} />}
					<div className={useWide ? (full ? styles.containerWide_full : styles.containerWide) : styles.container}>
						<main className={styles.main}>
							<a href="/register">register</a>
							<a href="/settings/account">your account</a>
							<button
								onClick={async () => {
									await logout();
									setAccessToken("");
									await client!.resetStore();
									if (router.pathname !== "/") {
										router.push("/");
									}
								}}>
								Logout
							</button>
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
					{showNav && (showSidebar ? <Nav sidebarSpacing={true} loggedIn={getAccessToken() !== ""} /> : <Nav sidebarSpacing={false} loggedIn={getAccessToken() !== ""} />)}

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
			{luna ? <TitlebarButtons /> : null}
			<div>{content}</div>
		</>
	);
};

export default Layout;
