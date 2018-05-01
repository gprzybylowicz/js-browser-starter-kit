import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackMd5Hash from "webpack-md5-hash";
import ExtractTextPlugin from "extract-text-webpack-plugin"
import packageJson from "./package";

export default {
	// devtool: "source-map", //uncomment for generation sources map for prod
	entry: {
		main: path.resolve(__dirname, "src/main"),
		vendor: path.resolve(__dirname, "src/vendor")
	},
	target: "web",
	output: {
		path: path.resolve(__dirname, "bin"),
		filename: "[name].[chunkhash].js"
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: "initial",
					test: "vendor",
					name: "vendor",
					enforce: true
				}
			}
		}
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

		//Minify code
		// new webpack.optimize.UglifyJsPlugin(),
	],
	module: {
		rules: [
			{test: /\.js$/, exclude: /node_modules/, use: "babel-loader"},
			{
				test: /\.(s*)css$/, use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			}
		]
	}
};
