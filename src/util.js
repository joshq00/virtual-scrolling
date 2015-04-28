export function isObject ( arg ) {
	return typeof arg === 'object' && arg !== null;
}
export function extend ( origin, ...add ) {
	origin = origin || {};
	return add.reduce( ( obj, props ) => {
		if ( !isObject( props ) ) {
			return obj;
		}
		for ( let key of Object.keys( props ) ) {
			if ( props[ key ] !== undefined ) {
				obj[ key ] = props[ key ];
			}
		}
		return obj;
	}, origin );
}
