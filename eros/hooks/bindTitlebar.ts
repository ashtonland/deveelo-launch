import { appWindow } from "@tauri-apps/api/window";

const bindTitlebar = async () => {
	setTimeout(() => {
		document.getElementById("titlebar-minimize")?.addEventListener("click", () => appWindow.minimize());
		document.getElementById("titlebar-maximize")?.addEventListener("click", async () => {
			let max = await appWindow.isMaximized();
			max ? appWindow.unmaximize() : appWindow.maximize();
		});
		document.getElementById("titlebar-close")?.addEventListener("click", () => appWindow.close());
	}, 100);
};

export default bindTitlebar;
