/* jshint devel: true, esnext: true */
import React from 'react';
import alertStore from './alert-store';

let AlertList = React.createClass({
	getInitialState () {
		return {
			data: alertStore.getAll(),
			offset: 0,
			startRow: 0,
			endRow: 50
		};
	},

	_onScroll () {
		clearTimeout( this._timeout );
		this._timeout = setTimeout(() => {
			let tableEl = this.refs.table.getDOMNode();
			let scrollY = tableEl.scrollTop;
			let height = tableEl.clientHeight;

			let offset = Math.max( 0, scrollY - 20.0 );
			let startRow = ~~( offset / 20 );
			let endRow = startRow + ~~( height / 20 + 5 );
			// let data = alertStore.getAll( startRow, endRow );
			this.setState({ offset, startRow, endRow });
		}, 150 );
	},

	render () {
		window.list = this;
		let { startRow, endRow, offset } = this.state;
		let tbodyStyle = {
			height: alertStore.getTotal() + 'em',
			top: offset
		};
		let alerts = this.state.data
			.slice( startRow, endRow )
			.map( alert => <Alert key={alert.priceExceptionId} alert={alert} /> );

		return (
			<div>
				<table onScroll={this._onScroll} ref='table'>
				<tbody style={tbodyStyle}>
					{alerts}
				</tbody>
				</table>
			</div>
		);
	}
});
let Alert = React.createClass({
	render () {
		let alert = this.props.alert;
		return (
			<tr>
			{/*
			<td>{alert.cls}</td>
			<td>{alert.competitors}</td>
			<td>{alert.ctgy}</td>
			<td>{alert.subcls}</td>
			<td>{alert.subsubcls}</td>
			<td>{alert.currentBlendedCostAmount}</td>
			<td>{alert.dept}</td>
			<td>{alert.markup}</td>
			<td>{alert.mirrorMarketFlag}</td>
			<td>{alert.exceptionAgeDays}</td>
			<td>{alert.exceptionInCart}</td>
			<td>{alert.onhandQuantity}</td>
			<td>{alert.priceExceptionId}</td>
			<td>{alert.priceExceptionRuleTypeCode}</td>
			<td>{alert.retailLocked}</td>
			<td>{alert.productInCart}</td>
			<td>{alert.rollingEightFiscalWeeksNetSalesAmount}</td>
			<td>{alert.rollingEightFiscalWeeksNetSalesQuantity}</td>
			<td>{alert.rollingTwelveFiscalPeriodNetSalesAmount}</td>
			<td>{alert.rollingTwelveFiscalPeriodNetSalesQuantity}</td>
			<td>{alert.priceEngineNetworkId}</td>
			<td>{alert.totalScoreNumber}</td>
			*/}
			<td>{alert.skuNumber}</td>
			<td>{alert.skuDescription}</td>
			<td>{alert.marketNumber} - {alert.marketName}</td>
			<td>{alert.currentRetailAmount}</td>
			<td>{alert.suggestRetailAmount}</td>
			<td>{alert.skuStatusCode}</td>
			</tr>
		);
	}
})
export default AlertList;
