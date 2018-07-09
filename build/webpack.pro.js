const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin;
const config = require("../config");
const insertScript = require("./insertScript");
const path = require("path");
const glob = require("glob");
//node读取对应的dll.js，内容改变意味着hash改变，方便浏览器缓存
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
		//自定义插件，在获取html template后动态往html内容插入dll.js ，hash参数是在尾巴上加入？ssdasd格式hash，每次打包都会变化，不推荐使用
		new insertScript({
			src: `./manifest/${getDll()}`,
			hash: false
		}),
		//引入dll，和webpacl.dll.config.js配合使用
		new webpack.DllReferencePlugin({
			context: path.join(__dirname, "../src"), //地址指向同dll.config的相同
			manifest: require("../dist/manifest/manifest.json"),
			name: "manifest" //名字和dll.config的library想同
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		})
	],
	//commonChunk在webpack新版本中被废除 使用下面的方式
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
			filename: "assets/js/vendors.[chunkhash:9].js", //分割的公共模块地址以及名称，公共模块无变化的情况下，chunkHash不改变，利于浏览器缓存
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0, // This is example is too small to create commons chunks
					reuseExistingChunk: true
				},
				//把来源是node_modules的单独提出来  缓存
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
