import JSONStream from 'JSONStream';
import Alert from './model';
import { Router } from 'express';
import { _extend } from 'util';

const router = Router();
export default router;

router.get( '/alerts', ( request, response ) => {
	let options = getOptions( request );
	console.log( options );

	let alerts = findAll( options );
	Alert
		.find( options.criteria )
		.count()
		.exec()
		.then( count => {
			response.setHeader( 'Content-Type', 'application/json' );
			let open = `{\n"count": ${ count },\n"data": [\n`;
			let sep = ',\n';
			let close = `\n] }`;
			return JSONStream.stringify( open, sep, close );
		} )
		.then( json => alerts.stream().pipe( json ).pipe( response ) );
	// 		response.write( '{' );
	// 		response.write( `"count": ${ count },` );
	// 		response.write( `"data": ` );

	// 	} );

	// .pipe( JSONStream.stringify() ).pipe( response );
		// .then(
		// 	data => response.json( data ),
		// 	e => response.status( 500 ).send( e )
		// );

} );

function getOptions ( request ) {
	let query = request.query;
	let { sort, limit, offset } = query;
	let criteria = _extend( {}, query );
	delete criteria.sort;
	delete criteria.limit;
	delete criteria.offset;

	limit = ~~limit > 0 ? ~~limit : 10;
	offset = ~~offset;

	return {
		sort,
		criteria,
		offset,
		limit
	};
}

export function findAll ( options ) {
	let begin = Date.now();
	let alerts = Alert
		.find( options.criteria )
		.skip( options.offset )
		.limit( options.limit )
		.lean();

	if ( options.sort ) {
		alerts.sort( options.sort );
	}
return alerts;
	alerts = alerts.exec();

	let count = Alert
		.find( options.criteria )
		.count()
		.exec();

	let future = Promise
		.all( [ count, alerts ] )
		.then( results => {
			return {
				count: results[ 0 ],
				data: results[ 1 ]
			};
		});

	return future.then( response => {
		let elapsed = parseFloat(
			( ( Date.now() - begin ) / 1000 ).toFixed( 3 )
		);
		return _extend( { elapsed }, response );
	});
}
