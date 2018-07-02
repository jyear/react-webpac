const webpackBaseConfig = require("./build/webpack.base");
const webpackDevConfig = require("./build/webpack.dev");
const webpackProConfig = require("./build/webpack.pro");
const webpackMerge = require("webpack-merge");
var webpackConfig = null;
if (process.env.NODE_ENV === "development") {
	webpackConfig = webpackMerge(webpackBaseConfig, webpackDevConfig);
}
if (process.env.NODE_ENV === "production") {
	webpackConfig = webpackMerge(webpackBaseConfig, webpackProConfig);
}
module.exports = webpackConfig;
