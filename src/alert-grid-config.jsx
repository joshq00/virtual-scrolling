import React from 'react';
import { decimal } from './format';

function decimalFormatter ( decimalPlaces ) {
	return ( value ) => decimal( value, decimalPlaces );
}

let columns = [ {
	name: 'sku.number',
	className: 'number',
	formatter ( value, record ) {
		value = record.sku.number;
		return ( '0000000000' + value ).replace( /0*(\d{4})(\d{3})(\d{3})$/, '$1-$2-$3' );
	}
}, {
	name: 'sku.description',
	formatter ( v, r ) {
		return r.sku.description;
	}
	// 	return (<HoverEl/>);
	// 	// return <span title={value}>{value}</span>;
	// }
}, {
	name: 'market.number',
	// className: 'market',
	formatter ( value, record ) {
		let { number, name } = record.market;
		return [ ~~number, name ].join( ' - ' );
	}
}, {
	name: 'sku.price',
	className: 'price',
	formatter: ( v, r ) => decimal( r.sku.price, 2 )
}, {
	name: 'suggestedPrice',
	className: 'price',
	formatter: decimalFormatter( 2 )
// }, {
// 	name: 'skuStatusCode',
// 	className: 'sku-status',
// 	valueMap: {
// 		100: 'Active',
// 		200: 'Seasonal',
// 		300: 'Out of season',
// 		400: 'Inactive',
// 	},
// 	formatter( value ) {
// 		return <small>{[ value, this.valueMap[ value ] ].join( ' - ' )}</small>;
// 	}
// }, {
// 	name: 'rollingTwelveFiscalPeriodNetSalesAmount',
// 	className: 'price',
// 	formatter: decimalFormatter( 0 )
} ];

export default { columns };
