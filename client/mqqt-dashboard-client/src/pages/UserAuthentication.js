import React from 'react';
import ReactDOM from 'react-dom';

import { hashHistory } from 'react-router';


import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Login from '../components/userAuthentication/Login';
import Register from '../components/userAuthentication/Register';

import ConfigStore from '../stores/ConfigStore';



var UserAuthentication = React.createClass({
  getInitialState: function() {
    return {
      authenticationMethod: "",

      transformUp: false,
      transformDown: false,
      AuthenticationMethodWrapperOpen: true,

      AuthenticationMethodWrapperTransitionSpeed: 1,

      authenticationShowMethodRegister: false,
      authenticationShowMethodLogin: false,

      authenticationHideLoginMethode: false,
      authenticationHideRegisterMethode: false,

      authenticationUpLoginMethode: false,
      authenticationUpRegisterMethode: false,

      AuthenticationLoginMethodWrapperHight: -1,
      AuthenticationRegisterMethodWrapperHight: -1,
    };
  },

  componentWillMount: function() {
    this.updateURL();
  },

  componentDidMount: function() {
    this.getHightOfMethodWrapper();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevProps.params.method !== this.props.params.method) {
      this.updateURL();
    }
  },

  getHightOfMethodWrapper() {
    var AuthenticationLoginMethodWrapperHight = -1;
    var AuthenticationRegisterMethodWrapperHight = -1;

    if ('loginMethod' in this.refs) {
      AuthenticationLoginMethodWrapperHight = this.refs.loginMethod.clientHeight;
    }
    if ('registerMethod' in this.refs) {
      AuthenticationRegisterMethodWrapperHight = this.refs.registerMethod.clientHeight;
    }

    this.setState({
      AuthenticationRegisterMethodWrapperHight: AuthenticationRegisterMethodWrapperHight,
      AuthenticationLoginMethodWrapperHight: AuthenticationLoginMethodWrapperHight,
    });
    return {
      AuthenticationLoginMethodWrapperHight: AuthenticationLoginMethodWrapperHight,
      AuthenticationRegisterMethodWrapperHight: AuthenticationRegisterMethodWrapperHight
    };
  },

  updateURL() {
    if (typeof this.props.params.method !== "undefined") {
      if (this.props.params.method == "register") {
        if (this.state.authenticationMethod !== "register") {
          this.setState({
            authenticationShowMethodRegister: true,
            authenticationShowMethodLogin: false,

            authenticationHideLoginMethode: false,
            authenticationHideRegisterMethode: false,
            authenticationMethod: "register",
          });
        }
      } else if(this.props.params.method == "login") {
        if (this.state.authenticationMethod !== "login") {
          this.setState({
            authenticationShowMethodRegister: false,
            authenticationShowMethodLogin: true,

            authenticationHideLoginMethode: false,
            authenticationHideRegisterMethode: false,
            authenticationMethod: "login",
          });
        }
      } else {
        hashHistory.push('/userauthentication/login');
      }
    } else {
      hashHistory.push('/userauthentication/login');
    }
  },

  chageAuthenticationMethod() {
    if (this.state.authenticationMethod === "register") {
      this.setState({
        transformUp: true,
        transformDown: false,

        authenticationUpRegisterMethode: true,
        AuthenticationMethodWrapperTransitionSpeed: 1,
        authenticationShowMethodLogin: true,
        authenticationHideLoginMethode: true,
      },() => {
        var methodeHeights = this.getHightOfMethodWrapper();
        setTimeout(() => {
          this.setState({
            transformUp: false,
            transformDown: true,

            AuthenticationMethodWrapperTransitionSpeed: 0,
            authenticationHideLoginMethode: false,
            authenticationShowMethodRegister: false,
            authenticationUpLoginMethode: true,
            authenticationMethod: "login"

          },() => {
            setTimeout(() => {
              hashHistory.push('/userauthentication/login');
              this.setState({
                AuthenticationMethodWrapperTransitionSpeed: 1,
                authenticationUpRegisterMethode: false,
                authenticationUpLoginMethode: false,
              },() => {
                setTimeout(() => {

                  this.setState({
                    transformUp: false,
                    transformDown: false,

                    AuthenticationMethodWrapperTransitionSpeed: 1,
                    authenticationUpRegisterMethode: false,
                    authenticationUpLoginMethode: false,
                  });
                }, 1000);
              });
            }, 10);
          });
        }, 1000);
      }
    );
    } else {
      this.setState({
        transformUp: true,
        transformDown: false,

        authenticationUpLoginMethode: true,
        AuthenticationMethodWrapperTransitionSpeed: 1,
        authenticationShowMethodRegister: true,
        authenticationHideRegisterMethode: true,
      },() => {
        var methodeHeights = this.getHightOfMethodWrapper();
        setTimeout(() => {
          this.setState({
            transformUp: false,
            transformDown: true,

            AuthenticationMethodWrapperTransitionSpeed: 0,
            authenticationHideRegisterMethode: false,
            authenticationShowMethodLogin: false,
            authenticationUpRegisterMethode: true,
            authenticationMethod: "register"

          },() => {
            setTimeout(() => {
              hashHistory.push('/userauthentication/register');
              this.setState({
                AuthenticationMethodWrapperTransitionSpeed: 1,
                authenticationUpLoginMethode: false,
                authenticationUpRegisterMethode: false,
              },() => {
                setTimeout(() => {

                  this.setState({
                    transformUp: false,
                    transformDown: false,

                    AuthenticationMethodWrapperTransitionSpeed: 1,
                    authenticationUpLoginMethode: false,
                    authenticationUpRegisterMethode: false,
                  });
                }, 1000);
              });
            }, 10);
          });
        }, 1000);
      }
    );
    }


  },

  render() {
    console.log(this.state.AuthenticationRegisterMethodWrapperHight);
    var AuthenticationMethodWrapperStyleCommbination = Object.assign(
      styles.userAuthenticationWrapperStyle,
      {transition: "margin-top "+ this.state.AuthenticationMethodWrapperTransitionSpeed + "s" },
      (this.state.authenticationUpLoginMethode)
        ?
        {marginTop :(this.state.AuthenticationLoginMethodWrapperHight + 50) * -1 + "px"}
          :
        {}
      ,
      (this.state.authenticationUpRegisterMethode)
        ?
        {marginTop :(this.state.AuthenticationRegisterMethodWrapperHight + 50) * -1 + "px"}
          :
        {}
      ,
      (this.state.authenticationUpRegisterMethode === false && this.state.authenticationUpLoginMethode === false)
        ?
        {marginTop : "0px"}
          :
        {}
    );

    AuthenticationMethodWrapperStyleCommbination = JSON.parse(JSON.stringify(AuthenticationMethodWrapperStyleCommbination));
    return (
      <Paper zDepth={1} style={styles.userAuthenticationSiteStyle}>
        <div className="test1234">
          <Paper zDepth={2} style={styles.userAuthenticationHeadStyle}>
            <h1 style={styles.userAuthenticationTitleStyle}>{this.state.authenticationMethod}</h1>
            <FloatingActionButton
              secondary={true}
              zDepth={2}
              style={
                Object.assign(
                  styles.userAuthenticationChangeLoginRegisterButtonStyle,
                  ((this.state.transformUp) ?
                    styles.userAuthenticationChangeLoginRegisterButtonRotatingUpStyle
                    :
                    {}
                  ),
                  ((this.state.transformDown) ?
                    styles.userAuthenticationChangeLoginRegisterButtonRotatingDownStyle
                    :
                    {}
                  )
                )
              }
              onTouchTap={this.chageAuthenticationMethod}
            >
              <ContentAdd />
            </FloatingActionButton>
          </Paper>
        </div>
        <div style={{overflowY: "hidden",}}>
          <div
            ref="AuthenticationMethodWrapper"
            style={AuthenticationMethodWrapperStyleCommbination}
          >
            {(this.state.authenticationShowMethodLogin)
                ?
                <div
                  ref="loginMethod"
                  style={
                    (this.state.authenticationHideLoginMethode)
                      ?
                      styles.userauthenticationHideMethode
                        :
                      {}
                  }
                >
                  <Login />
                </div>
                  :
                ""
            }
            {(this.state.authenticationShowMethodRegister)
                ?
                <div
                  ref="registerMethod"
                  style={
                    (this.state.authenticationHideRegisterMethode)
                      ?
                      styles.userauthenticationHideMethode
                        :
                      {}
                  }
                >
                  <Register />
                </div>
                  :
                ""
            }
          </div>
        </div>
      </Paper>
    );
  }
});

const styles = {
  userAuthenticationSiteStyle: {
    width: "60%",
    margin: "100px auto",
    minWidth: 280,
    maxWidth: 600,
  },
  userAuthenticationHeadStyle: {
    backgroundColor: ConfigStore.colors.primaryColor,
    padding: 10,
    zIndex: "30 !important",
    position: "relative",
  },
  userAuthenticationTitleStyle: {
    marginBottom: 0,
    color: "#fff",
  },
  userAuthenticationChangeLoginRegisterButtonStyle: {
    backgroundColor: "#787",
    float: "right",
    marginRight: -30,
    marginTop: -20,
  },
  userAuthenticationChangeLoginRegisterButtonRotatingUpStyle: {
    transform: "rotateX(180deg)",
    transition: "transform 1s",
  },
  userAuthenticationChangeLoginRegisterButtonRotatingDownStyle: {
    transform: "rotateX(0deg)",
    transition: "transform 1s",
  },
  userauthenticationHideMethode: {
    position: "fixed",
    top: -1000,
  },
  userAuthenticationWrapperStyle: {
    zIndex: "20 !important",
    position: "relative",
  }
};

module.exports = UserAuthentication;
