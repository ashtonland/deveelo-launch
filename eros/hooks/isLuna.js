const isLuna = () => {
	if (window.__TAURI__) {
		return true;
	}

	return false;
};

export default isLuna;
