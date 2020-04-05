import React, {Component} from "react";
import {connect} from 'react-redux';

export class Header extends Component {

  userLogged = () => {
    return !!this.props.user;
  };

  showContent = () => {
    if (this.userLogged()) {
      return <li><a href="/auth/google">Login with Google</a></li>;
    } else {
      return <li><a href="/api/current_user">Your user</a></li>;
    }
  };

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo" href="/">Emaily App</a>
          <ul className="right hide-on-med-and-down" id="nav-mobile ">
            {this.showContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: store.user
  };
};

export default connect(mapStateToProps)(Header);