require( './scroll.less' );
if ( document.documentMode <= 8 ) {
	require( './ie8.less' );
}
import React from 'react';
import Grid from './grid';
import alertStore from './alert-store';
import { columns } from './alert-grid-config';

window.React = React;

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
			<h1>header</h1>
			<Grid columns={columns} data={this.state.data} keyField={'id'} />
		</div>
		);
	}
});
export default App;
console.time( 'start' );
React.render( <App />, document.body, () => {
	console.timeEnd( 'start' );
} );
