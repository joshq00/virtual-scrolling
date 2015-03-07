/* jshint devel: true, esnext: true */
import uuid from 'node-uuid';
import {EventEmitter} from 'events';
import alerts from './alerts.json';

let data = [];
for ( let i = 0; i < 25; i++ ) {
	data.push( ...alerts.response.data );
}
data = data.map( Object.create );
data.forEach( ( alert, i ) => {
	alert.id = alert.priceExceptionId = uuid.v4();
	alert.skuNumber = i;
});
alerts = undefined;

function getAll ( start = 0, end = data.length ) {
	return data.slice( start, end );
}

class AlertStore extends EventEmitter {
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
