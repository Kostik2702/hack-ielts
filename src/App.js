import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cn from 'classnames';

import Routes from './routes/Routes';
import './App.scss';
import Header from './views/header/HeaderContainer';

import {
  updateState, userAuthenticated, loadFBSDK, checkAuth,
} from './ducks/auth.duck';
import { fetchUserConfig } from './ducks/app.duck';

import CountrySelector from './views/countrySelector/CountrySelector';

import spinner from './assets/spinner.svg';

const mapStateToProps = state => ({
  loading: state.app.loading,
  showCountrySelector: state.app.showCountrySelector,
  isAuthenticated: state.auth.isAuthenticated,
  isAuthenticating: state.auth.isAuthenticating,
});

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({
      updateState, fetchUserConfig, userAuthenticated, loadFBSDK, checkAuth,
    }, dispatch),
  };
}

@connect(mapStateToProps, mapActionsToProps)
class App extends Component {
  async componentDidMount() {
    this.props.actions.loadFBSDK();
    this.props.actions.fetchUserConfig();
    this.props.actions.checkAuth();
  }

  render() {
    const { loading, showCountrySelector } = this.props;
    const childProps = {
      isAuthenticated: this.props.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    };

    return (
      !this.props.isAuthenticating && (
        <div className={cn('App container', loading ? 'App--spinner' : null)}>
          <Header />
          <div className="App__body">
            <Routes childProps={childProps} />
          </div>

          { showCountrySelector && (
            <div className="App__overlayContainer">
              <CountrySelector />
            </div>
          )}

          { loading && (
            <div className="App__overlayContainer">
              <img src={spinner} alt="spinner" />
            </div>
          )}

        </div>
      )
    );
  }
}

export default withRouter(App);
