import React from 'react';
import Cell from './cell';
import ColumnDef from './column-def';

const { PropTypes } = React;

class Row extends React.Component {
	shouldComponentUpdate ( nextProps, nextState ) {
		return false;
	}

	render () {
		let { item, columns } = this.props;

		let cells = columns.map( column =>
			<Cell
				column={ column }
				item={ item }
				key={ column.name }
				/>
		);

		return (
		<div className='row'>
			{ cells }
		</div>
		);
	}
}

Row.propTypes = {
	columns: PropTypes.arrayOf( ColumnDef ).isRequired,
	item: PropTypes.object.isRequired
};

export default Row;
