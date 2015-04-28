import React from 'react';
const { PropTypes } = React;

const ColumnDef = PropTypes.shape( {
	name: PropTypes.string.isRequired,
	formatter: PropTypes.func,
	sortNormalizer: PropTypes.func,
	className: PropTypes.string,
	style: PropTypes.object
} );

export default ColumnDef;
