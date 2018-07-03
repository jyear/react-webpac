const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const rootPath = path.join(__dirname, "../src");
var entries = {};
entries.app = path.resolve(rootPath, "index.js");
var webpackConfig = {
	entry: entries,
	resolve: {
		extensions: [".js", ".json", ".jsx", ".less", ".css"],
		alias: {
			"#": path.resolve(rootPath, "assets/images"),
			"!": path.resolve(rootPath, "assets/js"),
			"@": path.resolve(rootPath, "assets/css")
		}
	},
	externals: {
		React: "react",
		ReactDOM: "react-dom",
		Redux: "redux",
		ReactRouter: "react-router"
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.html$/,
				use: {
					loader: "underscore-template-loader"
				}
			},
			{
				test: /\.js|tsx|ts$/,
				use: ["babel-loader"],
				include: rootPath
			},
			{
				test: /\.css|less$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "postcss-loader", "less-loader"]
				})
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
		new HtmlWebpackPlugin({
			template: path.resolve(rootPath, "../public/index.html")
		}),
		new ExtractTextPlugin("assets/css/[name].css")
	]
};
module.exports = webpackConfig;
