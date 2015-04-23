import React from 'react';
import Cell from './cell';
import ColumnDef from './column-def';

const { PropTypes } = React;

const Row = React.createClass({
	propTypes: {
		columns: PropTypes.arrayOf( ColumnDef ).isRequired,
		item: PropTypes.object.isRequired
	},

	// shouldComponentUpdate ( nextProps, nextState ) {
	// 	return false;
	// },

	render () {
		let { item, columns } = this.props;

		let cells = columns.map( column =>
			<Cell
				key={ column.name }
				column={ column }
				item={ item } />
		);

		return (
		<div className='row'>
			{ cells }
		</div>
		);
	}
});

export default Row;
