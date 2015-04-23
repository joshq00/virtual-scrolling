/* jshint devel: true, esnext: true */
import {EventEmitter} from 'events';
import dispatcher from './dispatcher';

let data = [];
function getAll () {
	return data;
}

class AlertStore extends EventEmitter {
	constructor () {
		super();
		dispatcher.register( this.action.bind( this ) );
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

	getAll () {
		return getAll();
	}

	action ( action ) {
		let { type } = action;

		switch ( type ) {
			case 'RAW_ALERTS':
				data = action.data;
				this.emit();
		}
	}
}

let alertStore = window.alertStore = new AlertStore();
export default alertStore;
