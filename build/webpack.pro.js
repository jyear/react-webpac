const webpack = require("webpack");
const config = require("../config");
const insertHTML = require("./insertHtml");
const path = require("path");
var webpackProConfig = {
	mode: "production",
	output: {
		path: config.outputRoot,
		filename: "assets/js/[name].[chunkhash:9].js",
		chunkFilename: "assets/js/[name].js",
		publicPath: "./",
		sourceMapFilename: "[file].map"
	},
	devtool: "source-map",
	plugins: [
		new insertHTML({
			content: '<script src="./mainfest/vendor.dll.js"></script>'
		}),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require(path.join(
				__dirname,
				"../dist/mainfest/mainfest.json"
			)), //通过require引入manifest.json文件
			name: "vendor" //引入dll文件的变量名
		})
	]
};
module.exports = webpackProConfig;
