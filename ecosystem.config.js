module.exports = {
	apps: [
		{
			name: "Webmarks",
			port: "8030",
			exec_mode: "cluster",
			instances: "max",
			script: "./.output/server/index.mjs",
		},
	],
};
