/* eslint-disable no-console */

import express from 'express';
import path from 'path';
import open from 'open';
import webpack from "webpack"
import config from "../webpack.config.dev"
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from "webpack-hot-middleware";

const port = 3000;
const app = express();

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(port, function(error) {
	if (error) {
		console.log(error);
	}
	else {
		open("http::/localhost:" + port)
	}
});
