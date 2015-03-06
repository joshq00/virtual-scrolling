require( './scroll.less' );
import React from 'react';
import AlertList from './alerts.jsx';
window.React = React;
let App = React.createClass({
	render () {
		return (
		<div>
			<h1>header</h1>
			<AlertList />
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
