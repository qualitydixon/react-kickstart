const tsc = require('typescript');
const webpackConfig = require('fs').readFileSync('./webpack.config.ts', 'utf8');

const options = {
	compilerOptions: {
		target: 'es5',
		module: 'commonjs',
		allowJs: false,
		checkJs: false
	}
};
eval(tsc.transpileModule(webpackConfig, options).outputText);
