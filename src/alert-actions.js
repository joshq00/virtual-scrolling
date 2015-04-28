import rp from 'reqwest';
import dispatcher from './dispatcher';
import { serialize } from './url';
import { extend } from './util';

/*
import xhrstream from './xhrstream';
import JSONStream from 'JSONStream';
( () => {
	let rq = new XMLHttpRequest();
	rq.open( 'GET', '/rs/alerts?sku.dept=27&sku.cls=4&sku.ctgy=101&limit=20000' );
	let data = [];
	let total = 0;
	new xhrstream( rq )
		.pipe( JSONStream.parse( 'data.*' ) )
		.on( 'data', d => {
			data.push( d );
			total++;
			if ( total === 1000 ) {
				got( { data } );
			}
		} )
		.on( 'end', () => {
			data = data.slice( 1000 );
			got( { data } );
		} );

} )();
*/
export function get ( options ) {
	dispatcher.dispatch( {
		type: 'NEW_SEARCH'
	} );
	return pagedGet( options );
}
function oneGet ( options ) {
	let query = serialize( options );
	return new Promise( ( resolve, reject ) => {
		rp( `/rs/alerts?${ query }` ).then( resolve, reject );
	} );
	// let ws = rp( `/rs/alerts?${ query }` );
// ws = Promise.reject();
	// ws.then( got );
	// return ws;
}
function fixOptions ( options ) {
	options = extend( {}, options );
	let { offset, limit } = options;
	offset = parseInt( offset, 10 ) || 0;
	offset = Math.max( offset, 0 );

	limit = parseInt( limit, 10 ) || 500;
	// limit = Math.min( limit, 5000 );
	limit = Math.max( limit, 100 );

	return extend( options, { offset, limit } );
}
function pagedGet ( options ) {
	options = fixOptions( options );
	options.offset = 0;
	let first = oneGet( options );
	// first.then( got );
	first.then( response => {
		got( response );
		let { limit } = options;
		let offset = limit;
		let total = response.count;
		let promises = [ first ];

		/*limit = options.limit = total;*/
		limit = options.limit = 5000;
		// let getLast = ( args ) => args[ args.length - 1 ];
		// let resolveBlank = () => Promise.resolve();
		for ( ; offset < total; offset += limit ) {
			// let next = oneGet( extend( options, { offset } ) );
			let getNext = oneGet.bind( null, extend( {}, options, { offset } ) );
			// sequential
			// let promise = Promise.all( promises )
			// 	.then( getNext )
			// 	.then( got );

			// all at once
			let next = getNext();
			let promise = Promise.all( promises ).then( () => next ).then( got );

			// let promise = Promise
			// 	.all( [ getLast( promises ), next ] )
			// 	.then( getLast )
			// 	.then( got )
			// 	// .then( resolveBlank )
			// 	;

			promises.push( promise );
		}
		return Promise.all( promises );
	} );

	// return ws.then( data => {
	// 	offset += limit;
	// 	if ( offset < data.count ) {
	// 		get( extend( {}, options, { offset } ) );
	// 	}
	// 	return data;
	// } ).then( got );
}

function got ( response ) {
	let { count, data } = response;
	// data.length = response.count;

	dispatcher.dispatch( {
		type: 'RAW_ALERTS',
		data,
		count
	} );
	// return response;
}
