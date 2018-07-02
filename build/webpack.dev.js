const webpack = require("webpack");
const config = require("../config");
const path = require("path");
var webpackDevConfig = {
	mode: "development",
	devtool: "cheap-module-eval-source-map",
	devServer: {
		contentBase: path.join(__dirname, "../dist"),
		historyApiFallback: false,
		host: "127.0.0.1",
		port: 8001,
		open: true,
		inline: true,
		hot: true
	},
	output: {
		path: config.outputRoot,
		filename: "assets/js/[name].js",
		chunkFilename: "assets/js/[name].js",
		sourceMapFilename: "[file].map"
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
	optimization: {
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
module.exports = webpackDevConfig;
