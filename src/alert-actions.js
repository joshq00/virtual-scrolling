import rp from 'reqwest';
import dispatcher from './dispatcher';
import { serialize } from './url';

export function get ( options ) {
	let query = serialize( options );

	return rp( `/rs/alerts?${ query }` )
		// .then( JSON.parse )
		.then( got );
}

function got ( response ) {
	let data = response.data;
	data.length = response.count;

	dispatcher.dispatch({
		type: 'RAW_ALERTS',
		data
	});
}