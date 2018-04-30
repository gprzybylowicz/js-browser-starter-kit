import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackMd5Hash from "webpack-md5-hash";
import ExtractTextPlugin from "extract-text-webpack-plugin"
import packageJson from "./package";

export default {
	debug: true,
	// devtool: "source-map", //uncomment for generation sources map for prod
	noInfo: false,
	entry: {
		main: path.resolve(__dirname, "src/main"),
		vendor: path.resolve(__dirname, "src/vendor")
	},
	target: "web",
	output: {
		path: path.resolve(__dirname, "bin"),
		filename: "[name].[chunkhash].js"
	},
	plugins: [
		//Hash files
		new WebpackMd5Hash(),

		//Generate external css
		new ExtractTextPlugin('[name].[contenthash].css'),

		//Generate index.html from template
		new HtmlWebpackPlugin({
			template: "src/index.html",
			inject: "head",
			minify: {
				// removeComments: true,  //to be able inject buildData and version, TODO: find other solution
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},

			//inject data using ESJ templates(http://ejs.co/)
			injectData: {
				buildDate: new Date().toISOString(),
				version: packageJson.version
			},
		}),

		// Use CommonsChunkPlugin to create a separate bundle
		// of vendor libraries so that they're cached separately.
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),

		// Eliminate duplicate packages when generating bundle
		new webpack.optimize.DedupePlugin(),

		//Minify code
		new webpack.optimize.UglifyJsPlugin(),
	],
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loaders: ["babel"]},
			{test: /\.(s*)css$/, loader: ExtractTextPlugin.extract(["css", 'sass'])}
		]
	}
};
