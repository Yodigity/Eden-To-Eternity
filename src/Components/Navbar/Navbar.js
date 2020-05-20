import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import "./Navbar.css";

import PostTalk from "../PostTalk/PostTalk";
import PropTypes from "prop-types";
import ButtonIcon from "../../util/ButtonIcon";
import Notifications from "./Notifications";

import { connect } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <Fragment>
        <AppBar>
          <Toolbar className='nav-container'>
            {authenticated ? (
              <Fragment>
                <PostTalk />

                <Link to='/'>
                  <ButtonIcon tip='Home'>
                    <HomeIcon />
                  </ButtonIcon>
                </Link>

                <Notifications />
              </Fragment>
            ) : (
              <Fragment>
                <Button color='inherit' component={Link} to='/'>
                  Home
                </Button>
                <Button color='inherit' component={Link} to='/login'>
                  Login
                </Button>
                <Button color='inherit' component={Link} to='/signup'>
                  Sign Up
                </Button>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
