import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateState, handleFBAuth } from '../ducks/auth.duck'

function waitForInit() {
  return new Promise((res, rej) => {
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

const mapStateToProps = state => {
  return {
    writingTasks: state.tasks.writingTasks,
  };
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ updateState, handleFBAuth }, dispatch)
  }
}

@connect(mapStateToProps, mapActionsToProps)
class FacebookButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    await waitForInit();
    this.setState({ isLoading: false });
  }

  statusChangeCallback = response => {
    console.log('response.status', response);

    if (response.status === "connected") {
      console.log('response', response);
      this.props.actions.handleFBAuth(response.authResponse);
    } else {
      alert(response);
    }
  };

  checkLoginState = () => {
    window.FB.getLoginStatus(this.statusChangeCallback);
  };

  handleClick = () => {
    window.FB.login(this.checkLoginState, {scope: "public_profile,email"});
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Login with Facebook
      </button>
    );
  }
}

export default FacebookButton;