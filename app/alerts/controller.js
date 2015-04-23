import Alert from './model';
import { Router } from 'express';
import { _extend } from 'util';

const router = Router();
export default router;

router.get( '/alerts', ( request, response ) => {
	let options = getOptions( request );
	console.log( options );
	findAll( options )
		.then(
			data => response.json( data ),
			e => response.status( 500 ).send( e )
		);
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

	alerts = alerts.exec();

	let count = Alert
		.find( options.criteria )
		.count()
		.exec();

	// return buildResponse( options, alerts, count );
	return Promise.all( [ alerts, count ] )
		.then ( ( results ) => {
			let elapsed = parseFloat(
				( ( Date.now() - begin ) / 1000 ).toFixed( 3 )
			);
			let alerts = results[ 0 ];
			let count = results[ 1 ];
			return {
				elapsed,
				count,
				alerts,
			};
		});
	// return {
	// 	alerts,
	// 	count
	// };
	// return new DSResponse( count, alerts, options.offset, options.limit );
}
