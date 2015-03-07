
const add = /(\d)(?=(\d{3})+(\.|$))/g;
function addCommas ( str ) {
	let parts = str.split( /\./ );
	let [ whole ] = parts;
	parts[ 0 ] = whole.replace( add, '$1,' );
	return parts.join( '.' );
}

export function decimal ( value, pad = 2 ) {
	value = +value;
	if ( isNaN( value ) ) {
		return null;
	}
	return addCommas( value.toFixed( pad ) );
}
