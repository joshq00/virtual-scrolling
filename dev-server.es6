import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.dev.es6';
import './server';

let app = new WebpackDevServer( webpack( config ), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true
});
// app.use( '/', express.static( 'public' ) );
// app.use( '/node_modules', express.static( 'node_modules' ) );


app.listen( config.port, function ( err, result ) {
	if ( err ) {
		console.log( err );
	}

	console.log( 'Listening at localhost:' + config.port );
});