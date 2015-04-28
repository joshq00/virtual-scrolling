// import cluster from 'cluster';
// import app from './app';
require( 'babel/register' );
var cluster = require( 'cluster' );
var app = require( './app' );

// Code to run if we're in the master process
if ( process.argv.indexOf( '--debug' ) < 0 && cluster.isMaster ) {
	var threads = require( 'os' ).cpus().length;

	if ( process.argv.indexOf( '-t' ) >= 0 ) {
		threads = ~~process.argv[ process.argv.indexOf( '-t' ) + 1 ];
		if ( threads <= 0 ) {
			throw new Error( 'invalid value for -t' );
		}
	}

	( function openThreads ( cpus ) {
		// for each CPU
		while ( cpus-- ) {
			// Create a worker
			cluster.fork();
		}
	} )( threads );

	// Listen for dying workers
	cluster.on( 'exit', function ( worker ) {
		// replace the dead worker
		console.log( 'Worker ' + worker.id + ' died. Replacing...' );
		cluster.fork();
	} );

// Code to run if we're in a worker process
} else {
	/*let server =*/ app.listen( app.get( 'port' ), () => {
		// console.log( 'Express server listening on port ' + server.address().port );
		console.log( 'Express server listening on port ' + app.get( 'port' ) );
	} );
}
