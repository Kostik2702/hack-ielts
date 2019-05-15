import React, { PureComponent } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { fetchUserNotes } from '../../ducks/app.duck';

const mapStateToProps = state => {
	return {}
}

function mapActionsToProps(state, r) {
	return {
		actions: bindActionCreators({ fetchUserNotes }, r.dispatch)
	}
}

class Header extends PureComponent {
	componentDidMount() {
		this.props.actions.fetchUserNotes({});
	}

	render() {
		return (
			<div>Hello from header</div>
		)
	}
}

const enhance = compose(
	connect(mapStateToProps),
	connect(mapActionsToProps)
);

export default enhance(Header);