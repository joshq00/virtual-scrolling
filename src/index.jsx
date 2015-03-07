require( './scroll.less' );
import React from 'react';
import AlertList from './alerts.jsx';
import Grid from './grid.jsx';
import alertStore from './alert-store';

window.React = React;

let App = React.createClass({
	render () {
		let alerts = alertStore.getAll().map( alert =>
			<div key={alert.id}>
				<span>{alert.skuNumber}</span>
				| <span>{alert.skuDescription}</span>
				| <span>{alert.marketNumber} - {alert.marketName}</span>
				| <span>{alert.currentRetailAmount}</span>
				| <span>{alert.suggestRetailAmount}</span>
				| <span>{alert.skuStatusCode}</span>
			</div>
		);

		return (
		<div>
		<h1>header</h1>
		<Grid>
			{alerts}
		</Grid>
		</div>
		);
	}
});
export default App;
// setTimeout( () => {
console.time( 'start' );
React.render( <App />, document.body, () => {
	console.timeEnd( 'start' );
} );
// }, 1000 );
