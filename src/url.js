const r20 = /%20/g;

function serialize( data ) {

	// If this is not an object, defer to native stringification.
	if ( !( data instanceof Object ) ) {
		return ( data == null ) ? '' : data.toString();
	}

	// Serialize each key in the object.
	let parts = Object.keys( data ).map( key => {
		let value = data[ key ];
		key = encodeURIComponent( key );
		value = encodeURIComponent( value == null ? '' : value );
		return `${ key }=${ value }`;
	});

	// Serialize the buffer and clean it up for transportation.
	return parts.join( '&' ).replace( r20, '+' );

}


function buildParams ( prefix, obj, add ) {
	var name;

	if ( Array.isArray( obj ) ) {
		// Serialize array item.
		obj.forEach( ( v, i ) => {
			// Item is non-scalar (array or object), encode its numeric index.
			buildParams( prefix + ( typeof v === 'object' ? `[${ i }]` : '' ), v, add );
		});

	} else if ( obj instanceof Object ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + `[${ name }]`, obj[ name ], add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
function param ( a ) {
	var prefix,
		s = [],
		add = function ( key, value ) {
			var strval = encodeURIComponent( key );
			// If value is a function, invoke it and return its value
			value = ( value instanceof Function ) ? value() : value;

			if ( value != null ) {
				strval += '=' + encodeURIComponent( value );
			}

			s[ s.length ] = strval;
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) ) {
		// Serialize the form elements
		a.forEach( ( v, k ) => {
			add( v.name, v.value );
		});

	} else {
		// If traditional, encode the 'old' way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], add );
		}
	}

	// Return the resulting serialization
	return s.join( '&' ).replace( r20, '+' );
}
export var serialize = param;
