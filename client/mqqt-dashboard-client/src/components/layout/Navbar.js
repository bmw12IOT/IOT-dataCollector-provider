import React from 'react';
import AppBar from 'material-ui/AppBar';

import LoggedInNavbarSettings from './NavbarComponents/LoggedInNavbarSettings'
import LoggedOutNavbarSettings from './NavbarComponents/LoggedOutNavbarSettings'



const navbartStyle = {
  position: 'fixed',
};

const placeholderStyle = {
  marginTop: 65,
  display: "inline-block",
};

/**
 *
 * Top navigation
 *
 */
var Navbar = React.createClass({
  getInitialState: function() {
    return {
      logedIn: true,
    };
  },


  render() {
    return (
      <div>
        <AppBar
          title="MQTT-Dashboard"
          style={navbartStyle}
          zDepth={2}
          showMenuIconButton={false}
          iconElementRight={this.state.logedIn ? <LoggedInNavbarSettings /> : <LoggedOutNavbarSettings />}
        />
        <div style={placeholderStyle}></div>
      </div>
    );
  }
});

module.exports = Navbar;
