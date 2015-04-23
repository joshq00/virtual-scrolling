import React from 'react';
import { decimal } from './format';

function decimalFormatter ( decimalPlaces ) {
	return ( value ) => decimal( value, decimalPlaces );
}

let HoverEl = React.createClass({
	getInitialState () {
		return {
			hoverState: 0
		};
	},
	_mout () {
		this.setState({ hoverState: 0 })
	},
	_mover () {
		this.setState({ hoverState: 1 })
	},
	render () {
		// <div >
		return (
			<div onMouseOver={this._mover} onMouseOut={this._mout}>
				{this.state.hoverState}
			</div>
		);
		// </div>
	}
});


let columns = [ {
	name: 'skuNumber',
	className: 'number',
	formatter ( value ) {
		return ( '0000000000' + value ).replace( /0*(\d{4})(\d{3})(\d{3})$/, '$1-$2-$3' );
	}
}, {
	name: 'skuDescription',
	// formatter ( value ) {
	// 	return (<HoverEl/>);
	// 	// return <span title={value}>{value}</span>;
	// }
}, {
	name: 'marketNumber',
	// className: 'market',
	formatter ( value, record ) {
		return [ ~~value, record.marketName ].join( ' - ' );
	}
}, {
	name: 'currentRetailAmount',
	className: 'price',
	formatter: decimalFormatter( 2 )
}, {
	name: 'suggestRetailAmount',
	className: 'price',
	formatter: decimalFormatter( 2 )
}, {
	name: 'skuStatusCode',
	className: 'sku-status',
	valueMap: {
		100: 'Active',
		200: 'Seasonal',
		300: 'Out of season',
		400: 'Inactive',
	},
	formatter( value ) {
		return <small>{[ value, this.valueMap[ value ] ].join( ' - ' )}</small>;
	}
}, {
	name: 'rollingTwelveFiscalPeriodNetSalesAmount',
	className: 'price',
	formatter: decimalFormatter( 0 )
} ];

export default { columns };
