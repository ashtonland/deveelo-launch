const { app, BrowserWindow } = require("electron");
if (require("electron-squirrel-startup")) app.quit();
const path = require("path");

require("update-electron-app")();

const createWindow = () => {
	const win = new BrowserWindow({
		width: 1500,
		height: 800,
		frame: false,
		show: true,
		icon: process.platform === "win32" ? path.join(__dirname, "build/icon.ico") : path.join(__dirname, "build/icon.icns"),
	});
	win.loadURL("http://localhost:3000");
	win.removeMenu();
};

app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
