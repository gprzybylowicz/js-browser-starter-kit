import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
	debug: true,
	devtool: "inline-source-map",
	noInfo: false,
	entry: [
		path.resolve(__dirname, "src/main"),
		'webpack-hot-middleware/client' //for hot reload
	],
	target: "web",
	output: {
		path: path.resolve(__dirname, "src"),
		publicPath: "/",
		filename: "bundle.js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "src/index.html",
			inject: "head"
		}),

		new webpack.HotModuleReplacementPlugin()
	],

	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loaders: ["babel"]},
			{test: /\.(s*)css$/, loaders: ["style", "css", 'sass']}
		]
	}
};
