module.exports = {
	publishers: [
		{
			name: "@electron-forge/publisher-github",
			config: {
				repository: {
					owner: "Treixatek",
					name: "deveelo",
				},
				prerelease: true,
			},
		},
	],
};
