import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';

import config from '../../secrets/config';
import { updateState, handleFBAuth } from '../../ducks/auth.duck';

function waitForInit() {
  return new Promise((res, rej) => {
    if (rej) {
      console.log(rej);
    }

    const hasFbLoaded = () => {
      if (window.FB) {
        res();
      } else {
        setTimeout(hasFbLoaded, 300);
      }
    };
    hasFbLoaded();
  });
}

const mapStateToProps = state => ({
  writingTasks: state.tasks.writingTasks,
});

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ updateState, handleFBAuth }, dispatch),
  };
}

@connect(mapStateToProps, mapActionsToProps)
class FacebookButton extends Component {
  async componentDidMount() {
    await waitForInit();
  }

  statusChangeCallback = (response) => {
    console.log('response.status', response);

    if (response.status === 'connected') {
      console.log('response', response);
      this.props.actions.handleFBAuth(response.authResponse);
    } else {
      alert(JSON.stringify(response));
    }
  };

  checkLoginState = () => {
    window.FB.getLoginStatus(this.statusChangeCallback);
  };

  handleClick = () => {
    window.FB.login(this.checkLoginState, { scope: 'public_profile,email' });
  };

  render() {
    return (
      <FacebookLogin
        appId={config.social.FB}
        autoLoad={false}
        fields="name,email"
        onClick={this.handleClick}
        icon="fa-facebook"
      />
    );
  }
}

export default FacebookButton;
