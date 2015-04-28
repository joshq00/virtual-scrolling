require( './scroll.less' );
if ( document.documentMode <= 8 ) {
	require( './ie8.less' );
}
import { extend } from './util';
import React from 'react';
import Grid from './grid';
import alertStore from './alert-store';
import * as alertActions from './alert-actions';
import { columns } from './alert-grid-config';

window.React = React;

alertActions.get( {
	'sku.dept': 27,
	'sku.cls': 4,
	'sku.ctgy': 101,
	// 'sku.subcls': 6,
	// 'sku.subcls': {
		// $in: [ 6, 7, 8, 9, 10 ]
	// 	$gt: 12
		// $in: [ 2, 3 ]
	// },
	// sort: [
	// 	// '-score'
	// 	'sku.number',
	// 	// 'market.number',
	// ].join(' '),
	limit: 1000
} );

function getData () {
	return {
		data: alertStore.getAll(),
		total: alertStore.getTotal()
	};
}
class MyGrid extends Grid {}
MyGrid.defaultProps = extend( {}, Grid.defaultProps, { columns } );

class App extends React.Component {
	constructor ( props ) {
		super( props );
		this.state = getData();
		this._change = this._change.bind( this );
	}

	componentDidMount () {
		alertStore.on( this._change );
	}

	componentWillUnmount () {
		alertStore.off( this._change );
	}

	_change () {
		// this.setState( getData() );

		let update = () => {
			this.setState( getData() );
		// 	console.log( 'update' );
		};
		let wait = 200;
		if ( this._changeTimeout == null ) {
			wait = 1;
		}
		clearTimeout( this._changeTimeout );
		this._changeTimeout = setTimeout( update, wait );

	}

	render () {
		let data = [];
		data.push( ...this.state.data );
		data.length = this.state.total;
		return (
		<div>
			<h1>header ({this.state.data.length} / {this.state.total})</h1>
			{/*
			<Grid data={this.state.data} keyField={'_id'} />
			<Grid columns={columns} data={this.state.data} keyField={'_id'} />
			*/}
			<MyGrid data={data} keyField={'_id'} />
		</div>
		);
	}
}
export default App;
console.time( 'start' );
React.render( <App />, document.body, () => {
	console.timeEnd( 'start' );
} );
