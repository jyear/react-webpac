const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin;
const config = require("../config");
const insertScript = require("./insertScript");
const path = require("path");
const glob = require("glob");
const getDll = function() {
	var dll = glob.sync(path.join(__dirname, "../dist/manifest/*.dll.js"));
	dll = dll[0];
	return dll.substr(dll.lastIndexOf("/") + 1, dll.length);
};

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
		new insertScript({
			src: `./manifest/${getDll()}`,
			hash: false
		}),
		new webpack.DllReferencePlugin({
			context: path.join(__dirname, "../src"),
			manifest: require("../dist/manifest/manifest.json"),
			name: "manifest"
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		})
	],
	optimization: {
		minimize: true,
		usedExports: true,
		providedExports: true,
		concatenateModules: true,
		mangleWasmImports: true,
		flagIncludedChunks: true,
		nodeEnv: "production",
		splitChunks: {
			chunks: "async",
			filename: "assets/js/vendors.[chunkhash:9].js",
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0, // This is example is too small to create commons chunks
					reuseExistingChunk: true
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -20,
					chunks: "all"
				}
			}
		}
	}
};
module.exports = webpackProConfig;
