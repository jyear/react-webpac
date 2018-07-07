const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

var rootPath = path.join(__dirname, "./app/src");
var webpackDll = {
	mode: "production",
	resolve: {
		extensions: [".js", ".jsx"]
	},
	entry: {
		manifest: [
			"babel-polyfill",
			"react",
			"react-dom",
			"react-router-dom",
			"redux",
			"react-redux",
			"redux-actions",
			"react-router-redux",
			"whatwg-fetch"
		]
	},
	module: {
		strictExportPresence: true
	},
	output: {
		path: path.join(__dirname, "/dist/manifest/"),
		filename: "[name].dll.js",
		library: "manifest"
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, "dist/manifest", "manifest.json"),
			context: path.join(__dirname, "./src"),
			name: "manifest"
		})
	]
};
module.exports = webpackDll;
