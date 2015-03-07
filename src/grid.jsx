import React from 'react';

let Grid = React.createClass({
	getDefaultProps () {
		return {
			header: true,
			rowHeight: 20
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
		return Math.floor( top / 20 );
	},
	getLastVisible () {
		let top = this.getTop();
		let bottom = top + this.getHeight();
		return Math.ceil( bottom / 20 );
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
		let rows = this.props.children;

		let first = Math.max( 0, this.getFirstVisible() - 10 );
		let last = this.getLastVisible() + 10;
		// last = last + ( last - first ); // render an extra page

		let scrollerStyle = {
			height: rows.length * this.props.rowHeight,
		};

		let top = this.getTop();
		let virtualStyle = {
			// top: top - top % 20
			top: first * 20
		};

		return (
		<div className='grid'>
			{header}
			<div className='body' ref='body' onScroll={this._onScroll}>
				<div className='virtual' style={virtualStyle}>
					{rows.slice( first, last )}
				</div>
				<div className='scroller' style={scrollerStyle}></div>
			</div>
		</div>
		);
	}
});
export default Grid;

let Header = React.createClass({
	render () {
		return (<div>header</div>);
	}
});