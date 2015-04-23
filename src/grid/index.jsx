import React from 'react';
import ColumnDef from './column-def';
import Row from './row';

const { PropTypes } = React;

const Header = React.createClass({
	render () {
		return (<div>header</div>);
	}
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
			scrollTop: 0,
			clientHeight: 0
		};
	},

	componentDidUpdate ( prevProps, prevState ) {
		let { scrollWidth } = this.refs.body.getDOMNode();
		this.state.scrollWidth = scrollWidth;
	},

	componentDidMount () {
		let {
			scrollTop,
			clientHeight
		} = this.getDOMNode();

		let { scrollWidth } = this.refs.body.getDOMNode();

		this.setState({
			scrollWidth,
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
		return this.state.scrollTop;
	},

	getHeight () {
		return this.state.clientHeight;
	},

	_onScroll ( e ) {
		let { scrollTop } = this.refs.body.getDOMNode();
		this.setState({
			scrollTop
		});
	},

	render () {
		let header = this.props.header ? <Header /> : null;
		let data = this.props.data;

		let first = Math.max( 0, this.getFirstVisible() - 5 );
		let last = this.getLastVisible() + 5;

		let filling = {
			height: this.props.rowHeight * data.length,
			width: this.state.scrollWidth
		}

		let virtualStyle = {
			top: first * this.props.rowHeight
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
				<div style={ filling }/>
				<div className='virtual' style={virtualStyle}>
					{ rows }
				</div>
			</div>
		</div>
		);
	}
});

export default Grid;
