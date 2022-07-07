import { appWindow } from "@tauri-apps/api/window";

const bindTitlebar = async () => {
	//wait 100ms (so after the buttons have been created), then bind
	//the window management functions too them
	setTimeout(() => {
		document.getElementById("titlebar-minimize")?.addEventListener("click", () => appWindow.minimize());
		document.getElementById("titlebar-maximize")?.addEventListener("click", async () => {
			//manually max & min, the builtin tauri function does not work properly
			let max = await appWindow.isMaximized();
			max ? appWindow.unmaximize() : appWindow.maximize();
		});
		document.getElementById("titlebar-close")?.addEventListener("click", () => appWindow.close());
	}, 100);
};

export default bindTitlebar;
