import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HeaderComponent from './HeaderComponent';

import './Header.scss';
import { handleLogOut } from '../../ducks/auth.duck';


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ handleLogOut }, dispatch),
  };
}

@connect(mapStateToProps, mapActionsToProps)
class HeaderContainer extends PureComponent {
  handleLogOut = () => {
    this.props.actions.handleLogOut();
  };

  render() {
    return <HeaderComponent {...this.props} handleLogOut={this.handleLogOut} />;
  }
}
export default HeaderContainer;
