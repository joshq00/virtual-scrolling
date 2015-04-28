/* jshint devel: true, esnext: true */
import {EventEmitter} from 'events';
import dispatcher from './dispatcher';

let data = [];
let total = 0;
function getAll () {
	return data;
}
function add ( items ) {
	data.push( ...items );
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
		return total/*data.length*/;
	}

	getAll () {
		return getAll();
	}

	action ( action ) {
		let { type } = action;

		switch ( type ) {
		case 'NEW_SEARCH':
			data = [];
			total = 0;
			this.emit();
			break;
		case 'RAW_ALERTS':
			add( action.data );
			total = action.count;
			this.emit();
			break;
		}
	}
}

let alertStore = window.alertStore = new AlertStore();
export default alertStore;
