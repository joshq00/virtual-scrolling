/* jshint devel: true, esnext: true */
import uuid from 'node-uuid';
import {EventEmitter} from 'events';
import alerts from './alerts.json';
import { _extend } from 'util';

let data = [];
for ( let i = 0; i < 25; i++ ) {
	data.push( ...alerts.response.data );
}
data = data.map( ( item, i ) => {
	item = _extend( {}, item );
	let id = uuid.v4();
	return _extend( item, {
		id,
		priceExceptionId: id,
		skuNumber: Math.floor( Math.random() * 1000000 + 100000 )
	});
});
alerts = undefined;

let resolved = false;
alerts = new Promise( function ( resolve, reject ) {
	let delay = 0;
	setTimeout( () => {
		resolve( data );
		resolved = true;
	}, delay );
} );

function getAll ( start = 0, end = data.length ) {
	return resolved ? data.slice( start, end ) : [];
}

class AlertStore extends EventEmitter {
	constructor () {
		super();
		alerts.then( () => this.emit() );
	}
	on ( cb ) {
		this.addListener( 'change', cb );
	}

	off ( cb ) {
		this.removeListener( 'change', cb );
	}

	emit () {
		super.emit( 'change' );
	}

	getTotal () {
		return data.length;
	}

	getAll ( ...args ) {
		return getAll( ...args );
	}
}

let alertStore = window.alertStore = new AlertStore();
export default alertStore;
