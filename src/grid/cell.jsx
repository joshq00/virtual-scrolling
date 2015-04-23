import React from 'react';

export default class Cell extends React.Component {
	render () {
		let { column, item } = this.props;
		let value = item[ column.name ];
		let displayVal = column.formatter ?
			column.formatter( value, item ) :
			value;

		return ( <div { ...column }>{ displayVal }</div> );
	}

	shouldComponentUpdate ( nextProps, nextState ) {
		return false;
	}
}
