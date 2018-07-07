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
			"@img": path.resolve(rootPath, "./assets/images"),
			"@js": path.resolve(rootPath, "./assets/js"),
			"@css": path.resolve(rootPath, "./assets/css")
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
				test: /\.js|jsx$/,
				use: ["babel-loader"],
				include: rootPath
			},
			{
				//antd样式处理
				test: /\.css$/,
				exclude: /src/,
				use: [
					{ loader: "style-loader" },
					{
						loader: "css-loader",
						options: {
							importLoaders: 1
						}
					}
				]
			},

			{
				test: /\.css|less$/,
				exclude: /node_modules/,
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
			template: path.resolve(rootPath, "../public/index.html"),
			minify: {
				collapseWhitespace: true //折叠空白区域 也就是压缩代码
			},
			hash: false
		}),
		new ExtractTextPlugin("assets/css/[name]_[chunkhash:9].css")
	]
};
module.exports = webpackConfig;
