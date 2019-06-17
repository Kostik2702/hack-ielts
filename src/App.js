import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './routes/Routes';
import config from './secrets/config';
import './App.scss';
import Header from './views/header/HeaderContainer';

import { updateState } from './ducks/auth.duck';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthenticating: state.auth.isAuthenticating,
});

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ updateState }, dispatch),
  };
}


@connect(mapStateToProps, mapActionsToProps)
class App extends Component {
  static loadFacebookSDK() { // eslint-disable-block no-param-reassign
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: config.social.FB,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.1',
      });
    };

    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      const js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  async componentDidMount() {
    App.loadFacebookSDK();

    try {
      await Auth.currentAuthenticatedUser();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'not authenticated') {
        alert(e);
      }
    }

    this.props.actions.updateState({ isAuthenticating: false });
  }

  handleLogout = async () => {
    await Auth.signOut();

    this.userHasAuthenticated(false);

    this.props.history.push('/login');
  };

  userHasAuthenticated = (authenticated) => {
    this.props.actions.updateState({ isAuthenticated: authenticated });
  };

  render() {
    const childProps = {
      isAuthenticated: this.props.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    };

    return (
      !this.props.isAuthenticating && (
        <div className="App container">
          <Header />
          <div className="App__body">
            <Routes childProps={childProps} />
          </div>
        </div>
      )
    );
  }
}

export default withRouter(App);
