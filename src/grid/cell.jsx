import React from 'react';

const Cell = React.createClass({
	shouldComponentUpdate ( nextProps, nextState ) {
		return false;
		// let { item } = this.props;
		// return item !== nextProps.item;
	},

	render () {
		let { column, item } = this.props;
		let styling = {
			className: column.className,
			style: column.style
		};

		let value = item[ column.name ];
		let displayVal = column.formatter ? column.formatter( value, item ) : value;

		return ( <div { ...styling }>{ displayVal }</div> );
	}
});

export default Cell;
