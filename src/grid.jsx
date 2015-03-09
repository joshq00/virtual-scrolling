import React from 'react';
const { PropTypes } = React;

const ColumnDef = PropTypes.shape({
	name: PropTypes.string.isRequired,
	formatter: PropTypes.func,
	sortNormalizer: PropTypes.func,
	className: PropTypes.string,
	style: PropTypes.object
});

let Grid = React.createClass({
	propTypes: {
		columns: PropTypes.arrayOf( ColumnDef ).isRequired,
		keyField: PropTypes.string.isRequired,
		data: PropTypes.arrayOf( PropTypes.object )
	},

	getDefaultProps () {
		return {
			header: true,
			rowHeight: 20,
			data: []
		};
	},
	getInitialState () {
		return {
			data: []
		};
	},

	componentDidMount () {
		let { scrollTop, clientHeight } = this.getDOMNode();
		this.setState({
			scrollTop,
			clientHeight
		});

		if ( document.documentMode <= 8 ) {
			this.refs.body.getDOMNode().onscroll = this._onScroll;
		}
	},

	getFirstVisible () {
		let top = this.getTop();
		return Math.floor( top / this.props.rowHeight );
	},

	getLastVisible () {
		let top = this.getTop();
		let bottom = top + this.getHeight();
		return Math.ceil( bottom / this.props.rowHeight );
	},

	getTop () {
		return this.state.scrollTop || 0;
	},

	getHeight () {
		let { clientHeight } = this.state;

		if ( clientHeight == null ) {
			 if ( !this.isMounted() ) {
			 	return 0;
			 }
			 clientHeight = this.getDOMNode().clientHeight;
			 this.setState( clientHeight );
		}

		return clientHeight;
	},

	_updateTop ( scrollTop ) {
		this.setState({ scrollTop });
	},

	_onScroll ( e ) {
		let target = e ? e.target : window.event.srcElement;
		this._updateTop( target.scrollTop );
	},

	render () {
		let header = this.props.header ? <Header /> : null;
		let data = this.props.data;

		let first = Math.max( 0, this.getFirstVisible() - 10 );
		let last = this.getLastVisible() + 10;
		// last = last + ( last - first ); // render an extra page

		let virtualStyle = {
			top: first * this.props.rowHeight,
			height: this.props.rowHeight * ( data.length - first )
		};

		let rows = data.slice( first, last ).map( item =>
			<Row
				columns={ this.props.columns }
				item={ item }
				key={ item[ this.props.keyField ] } />
		);

		return (
		<div className='grid'>
			{header}
			<div className='body' ref='body' onScroll={this._onScroll} tabIndex='0'>
				<div className='virtual' style={virtualStyle}>
					{ rows }
				</div>
			</div>
		</div>
		);
	}
});
export default Grid;
let Row = React.createClass({
	propTypes: {
		columns: PropTypes.arrayOf( ColumnDef ).isRequired,
		item: PropTypes.object.isRequired
	},
	render () {
		let { item, columns } = this.props;

		let cells = columns.map( col => {
			let field = col.name;
			let val = item[ field ];
			let displayVal = col.formatter ? col.formatter( val, item ) : val;

			return (
				<div key={ field } className={ col.className } style={ col.style }>
					{ displayVal }
				</div>
			);
		});

		return (
		<div className='row'>
			{ cells }
		</div>
		);
	}
});
let Header = React.createClass({
	render () {
		return (<div>header</div>);
	}
});