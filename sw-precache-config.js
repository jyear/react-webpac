//service work缓存文件，不建议缓存html会导致更新代码后第一次刷新代码不生效 ，因为缓存和页面同步 ，页面是取的当前缓存的页面而不是服务器最新，第二次刷新页面生效
module.exports = {
	stripPrefix: "dist/",
	staticFileGlobs: [
		"dist/manifest/manifest.json",
		"dist/manifest/manifest.*.dll.js",
		"dist/assets/**/!(*map*)"
	],
	dontCacheBustUrlsMatching: /\.\w{8}\./,
	swFilePath: "dist/service-worker.js"
};
