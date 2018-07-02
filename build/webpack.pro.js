const webpack = require("webpack");
const config = require("../config");
const insertHTML = require("./insertHtml");
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
			manifest: require("../dist/mainfest/vendor-mainfest.json")
		})
	],
	optimization: {
		runtimeChunk: {
			name: "manifest"
		},
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					chunks: "all"
				}
			}
		}
	}
};
module.exports = webpackProConfig;
