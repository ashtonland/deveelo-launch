import React, { useEffect } from "react";
import Image from "next/image";

import navStyles from "../../styles/nav.module.css";
import bindTitlebar from "../../hooks/bindTitlebar";
import isLuna from "../../hooks/isLuna";

const TitlebarButtons = () => {
	//use hard edges in the web browser
	let full = true;

	if (isLuna()) {
		//use round or hard edges based on if the window is in fullscreen
		//or  in a windowed state
		full = localStorage.getItem("fullscreen") === "true";

		useEffect(() => {
			//bind the min/max/fullscreen/close functionality to the buttons
			//in the dom after they have been created
			bindTitlebar();
		}, []);
	}
	return (
		//this bar runs accross the top, this serves as the window drag area
		<div data-tauri-drag-region className={navStyles.dragBar}>
			<div className={navStyles.titlebar}>
				{/* MINIMIZE BUTTON */}
				<div className={navStyles.titlebar_buttonM} id="titlebar-minimize">
					<Image src="/resources/minus.svg" alt="minimize" width={15.12} height={15.12} />
				</div>
				{/* MAXIMIZE BUTTON */}
				<div className={navStyles.titlebar_button} id="titlebar-maximize">
					<Image src="/resources/full.svg" alt="maximize" width={11.952} height={11.952} />
				</div>
				{/* CLOSE BUTTON - css styles are for rounded and hard upper right corner */}
				<div className={full ? navStyles.titlebar_buttonC_full : navStyles.titlebar_buttonC} id="titlebar-close">
					<Image src="/resources/x.svg" alt="close" width={15.12} height={15.12} />
				</div>
			</div>
		</div>
	);
};

export default TitlebarButtons;
