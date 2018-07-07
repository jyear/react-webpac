module.exports = {
	stripPrefix: "dist/",
	staticFileGlobs: [
		"dist/*.html",
		"dist/manifest/manifest.json",
		"dist/manifest/manifest.dll.js",
		"dist/assets/**/!(*map*)"
	],
	dontCacheBustUrlsMatching: /\.\w{8}\./,
	swFilePath: "dist/service-worker.js"
};
