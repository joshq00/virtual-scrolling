require( './scroll.less' );
if ( document.documentMode <= 8 ) {
	require( './ie8.less' );
}
import React from 'react';
import Grid from './grid';
import alertStore from './alert-store';
import * as alertActions from './alert-actions';
import { columns } from './alert-grid-config';

window.React = React;

alertActions.get({
	'sku.dept': 27,
	'sku.cls': 4,
	'sku.ctgy': 101,
	'sku.subcls': {
		// $in: [ 6, 7, 8, 9, 10 ]
		$gt: 12
		// $in: [ 2 ]
	},
	// sort: [
	// 	// '-score'
	// 	'sku.number',
	// 	// 'market.number',
	// ].join(' '),
	limit: 1000
});

function getData () {
	return {
		data: alertStore.getAll()
	};
}

let App = React.createClass({
	getInitialState () {
		return getData();
	},

	componentDidMount () {
		alertStore.on( this._change );
	},

	componentWillUnmount () {
		alertStore.off( this._change );
	},

	_change () {
		this.setState( getData() );
	},

	render () {
		return (
		<div>
			<h1>header ({this.state.data.length})</h1>
			<Grid columns={columns} data={this.state.data} keyField={'_id'} />
		</div>
		);
	}
});
export default App;
console.time( 'start' );
React.render( <App />, document.body, () => {
	console.timeEnd( 'start' );
} );
