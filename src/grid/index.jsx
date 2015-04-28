import React from 'react';
import Header from './header';
import ColumnDef from './column-def';
import Row from './row';

const { PropTypes } = React;

class Grid extends React.Component {
	constructor ( props ) {
		super( props );
		this.state = {
			scrollTop: 0,
			clientHeight: 0
		};
		this._onScroll = this._onScroll.bind( this );
	}

	componentDidUpdate ( prevProps, prevState ) {
		let { scrollWidth } = React.findDOMNode( this.refs.body );
		this.state.scrollWidth = scrollWidth;
	}

	componentDidMount () {
		let {
			scrollTop,
			clientHeight
		} = React.findDOMNode( this );

		let { scrollWidth } = React.findDOMNode( this.refs.body );

		this.setState( {
			scrollWidth,
			scrollTop,
			clientHeight
		} );

		if ( document.documentMode <= 8 ) {
			React.findDOMNode( this.refs.body ).onscroll = this._onScroll;
		}
	}

	getFirstVisible () {
		let top = this.getTop();
		return Math.floor( top / this.props.rowHeight );
	}

	getLastVisible () {
		let top = this.getTop();
		let bottom = top + this.getHeight();
		return Math.ceil( bottom / this.props.rowHeight );
	}

	getTop () {
		return this.state.scrollTop;
	}

	getHeight () {
		return this.state.clientHeight;
	}

	_onScroll ( e ) {
		let { scrollTop } = React.findDOMNode( this.refs.body );
		this.setState( {
			scrollTop
		} );
	}

	render () {
		let header = this.props.header ? <Header /> : null;
		let data = this.props.data;

		let first = Math.max( 0, this.getFirstVisible() - 5 );
		let last = this.getLastVisible() + 5;

		let filling = {
			height: this.props.rowHeight * data.length,
			width: this.state.scrollWidth
		};

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
			<div
				className='body'
				onScroll={ this._onScroll }
				ref='body'
				tabIndex='0'
			>
				<div style={ filling }/>
				<div className='virtual' style={ virtualStyle }>
					{ rows }
				</div>
			</div>
		</div>
		);
	}
}
Grid.propTypes = {
	columns: PropTypes.arrayOf( ColumnDef ).isRequired,
	data: PropTypes.arrayOf( PropTypes.object ),
	header: PropTypes.bool.isRequired,
	keyField: PropTypes.string.isRequired,
	rowHeight: PropTypes.number.isRequired
};
Grid.defaultProps = {
	header: true,
	rowHeight: 20,
	data: []
};

export default Grid;
