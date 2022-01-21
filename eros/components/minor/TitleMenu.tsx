import { useEffect, useState } from "react";
import getVersion from "../../hooks/getVersion";
import navStyles from "../../styles/nav.module.css";

const TitleMenu = () => {
	// var remote = window.require("electron").remote;
	// const currentWindow = remote.getCurrentWindow();
	// remote.getGlobal("mainWindow").minimize();
	// // manage window state, default to currentWindow maximized state
	// const [maximized, setMaximized] = useState(currentWindow.isMaximized());
	// // add window listeners for currentWindow
	// useEffect(() => {
	// 	const onMaximized = () => setMaximized(true);
	// 	const onRestore = () => setMaximized(false);
	// 	currentWindow.on("maximize", onMaximized);
	// 	currentWindow.on("unmaximize", onRestore);
	// 	return () => {
	// 		currentWindow.removeListener("maximize", onMaximized);
	// 		currentWindow.removeListener("unmaximize", onRestore);
	// 	};
	// }, []);

	// // used by double click on the titlebar
	// // and by the maximize control button
	// const handleMaximize = () => {
	// 	if (maximized) {
	// 		currentWindow.restore();
	// 	} else {
	// 		currentWindow.maximize();
	// 	}
	// };

	return (
		<div className={navStyles.menubar}>
			<p className={navStyles.menuTitle}>v{getVersion()}</p>
		</div>
	);
};

export default TitleMenu;
