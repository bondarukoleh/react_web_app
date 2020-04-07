import React, {Component} from "react";
import {connect} from 'react-redux';

class Header extends Component {
  showContent = () => {
    console.log(this.props)
    const {user} = this.props;
    if (user === null) {
      return <li>Fetching user data...</li>;
    } else if (user === false) {
      return <li><a href="/auth/google">Login with Google</a></li>;
    } else {
      return <li>{`Welcome ${user.name}!`}</li>;
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
    user: store.auth.user
  };
};

export default connect(mapStateToProps)(Header);