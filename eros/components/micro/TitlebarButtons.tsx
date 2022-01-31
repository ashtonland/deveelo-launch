import React, { useEffect } from "react";
import Image from "next/image";

import navStyles from "../../styles/nav.module.css";
import bindTitlebar from "../../hooks/bindTitlebar";
import isLuna from "../../hooks/isLuna";

const TitlebarButtons = () => {
	let full = true;

	if (isLuna()) {
		full = localStorage.getItem("fullscreen") === "true";

		useEffect(() => {
			bindTitlebar();
		}, []);
	}
	return (
		<div data-tauri-drag-region className={navStyles.dragBar}>
			<div className={navStyles.titlebar}>
				<div className={navStyles.titlebar_buttonM} id="titlebar-minimize">
					<Image src="/resources/minus.svg" alt="minimize" width={15.12} height={15.12} />
				</div>
				<div className={navStyles.titlebar_button} id="titlebar-maximize">
					<Image src="/resources/full.svg" alt="maximize" width={11.952} height={11.952} />
				</div>
				<div className={full ? navStyles.titlebar_buttonC_full : navStyles.titlebar_buttonC} id="titlebar-close">
					<Image src="/resources/x.svg" alt="close" width={15.12} height={15.12} />
				</div>
			</div>
		</div>
	);
};

export default TitlebarButtons;
