/* jshint node: true, esnext: true */
import webpack from 'webpack';

let port = process.env.PORT || 3000;

let entry = {
	index: './src/index',
};

let output = {
	path: __dirname + '/build/',
	publicPath: '/build/',
	filename: '[name].js'
};

let externals = {
	// react: 'React'
};

let target = 'web';

let loaders = [ {
	test: /\.jsx?$/,
	loaders: [
		'babel'
	],
	exclude: /node_modules/
}, {
	test: /\.json$/,
	loader: 'json'
}, {
	test: /\.less$/,
	loaders: [ 'style', 'css', 'less' ],
} ];

let resolve = {
	root: __dirname + '/src',
	modulesDirectories: [
		'web_modules',
		'node_modules'
	],
	extensions: [
		'',
		'.web.js',
		'.js',
		'.jsx',
		'.json'
	],
};


let plugins = [
];

export default {
	target,
	module: { loaders },
	entry,
	output,
	externals,
	resolve,
	plugins,
	port,
};
