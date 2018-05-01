import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
	mode: "development",
	devtool: "inline-source-map",
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
		rules: [
			{test: /\.js$/, exclude: /node_modules/, use: "babel-loader"},
			{test: /\.(s*)css$/, use: ["style-loader", "css-loader", 'sass-loader']}
		]
	}
};
