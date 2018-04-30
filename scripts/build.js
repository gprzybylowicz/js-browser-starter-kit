/*eslint-disable no-console*/

import webpack from "webpack"
import webpackConfig from "../webpack.config.prod"
import chalk from "chalk"

process.env.NODE_ENV = "production";

console.log(chalk.blue("Production build started..."));

webpack(webpackConfig).run((error, stats) => {
	if (error) {
		console.log(chalk.red(error));
		return 1;
	}

	const jsonStats = stats.toJson();

	if (jsonStats.hasErrors) {
		return jsonStats.errors.map(error => console.log(chalk.red(error)));
	}

	if (jsonStats.hasErrors) {
		return jsonStats.errors.map(error => console.log(chalk.red(error)));
	}

	if (jsonStats.hasWarnings) {
		console.log(chalk.yellow('Webpack generated the following warnings: '));
		jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
	}

	console.log(`Webpack stats: ${stats}`);
	console.log(chalk.green('Done!'));

	return 0;
});

