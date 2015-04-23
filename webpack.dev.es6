/* jshint devel: true, node: true, esnext: true, strict: false */

import webpack from 'webpack';
import { _extend } from 'util';
import { output, entry, loaders, port, resolve, plugins } from './webpack.config.es6';

let devtool = 'eval';

output = _extend( {}, output );
_extend( output, {
	filename: 'index.js',
	publicPath: `http://localhost:${port}/build/`,
	sourceMapFilename: 'debugging/[file].map',
} );

entry = [
	'webpack-dev-server/client?http://localhost:' + port,
	'webpack/hot/only-dev-server',
	'./src/index'
];

loaders = [ {
	test: /\.jsx?$/,
	loaders: [
		'react-hot',
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

plugins = [
	new webpack.HotModuleReplacementPlugin()
];

export default {
	module: { loaders },
	port,
	entry,
	output,
	resolve,
	plugins,
	devtool,
};
