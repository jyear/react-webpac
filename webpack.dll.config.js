const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
var rootPath = path.join(__dirname, "./app/src");
var webpackDll = {
	resolve: {
		extensions: [".js", ".jsx"]
	},
	entry: {
		vendor: [
			"babel-polyfill",
			"react",
			"react-router-dom",
			"redux",
			"react-redux",
			"redux-actions",
			"react-router-redux"
		]
	},
	output: {
		path: path.join(__dirname, "/dist/mainfest/"),
		filename: "[name].dll.js",
		library: "[name]_library"
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.css|less$/,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader",
					"less-loader"
				]
			},

			{
				test: /\.js|ts|tsx$/,
				use: ["babel-loader", "ts-loader"],
				include: rootPath
			},
			{
				test: /\.(js|jsx|mjs)$/,
				include: /node_modules/,
				loader: "babel-loader",
				options: {
					cacheDirectory: true,
					plugins: [
						["react-html-attrs"],
						["import", { libraryName: "antd", style: "css" }],
						["import", { libraryName: "antd", style: true }]
					]
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							name: "assets/img/[name].[hash:9].[ext]"
						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							name: "assets/font/[name].[hash:9].[ext]"
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, "dist/mainfest", "[name]-mainfest.json"),
			name: "[name]_library"
		})
	]
};
module.exports = webpackDll;
