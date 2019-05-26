import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import config from "./secrets/config";
import "./App.scss";
import Header from './views/header/HeaderContainer';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateState } from './ducks/auth.duck'


const mapStateToProps = state => {
  return {
    isAuthenticated: state.app.isAuthenticated,
    isAuthenticating: state.app.isAuthenticating
  };
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ updateState }, dispatch)
  }
}


@connect(mapStateToProps, mapActionsToProps)
class App extends Component {
  async componentDidMount() {
    this.loadFacebookSDK();

    try {
      await Auth.currentAuthenticatedUser();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== "not authenticated") {
        alert(e);
      }
    }

    this.props.actions.updateState({ isAuthenticating: false });
  }

  loadFacebookSDK() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId            : config.social.FB,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v3.1'
      });
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  userHasAuthenticated = authenticated => {
    this.props.actions.updateState({ isAuthenticated: authenticated });
  };

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);

    this.props.history.push("/login");
  };

  render() {
    const childProps = {
      isAuthenticated: this.props.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.props.isAuthenticating && (
        <div className="App container">
          <Header />

          <Routes childProps={childProps} />
        </div>
      )
    );
  }
}

export default withRouter(App);
