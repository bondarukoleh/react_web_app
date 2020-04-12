import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

class Header extends Component {
  showHeaderContent = () => {
    const {user} = this.props;
    if (user === null) {
      return <li>Fetching user data...</li>;
    } else if (user === false) {
      return <li><a href="/auth/google">Login with Google</a></li>;
    } else {
      return <React.Fragment>
        <li>{`Welcome ${user.name}!`}</li>
        <li><Link to="#">{`Your credits: ${user.credit}`}</Link></li>
        <li><Link to="/billing">Add more credit</Link></li>
        <li><a href="/api/logout">Logout</a></li>
        {/*We will sent full request to backend with browser refresh,
         but we also could handle this click via creating action "USER_LOGOUT", make inner ajax request to backend,
         without refresh, clear store etc.*/}
      </React.Fragment>;
    }
  };

  render() {
    const {user} = this.props;

    return (
      <nav>
        <div className="nav-wrapper">
          <Link className="brand-logo center" to={user ? '/surveys' : '/'}>Logo</Link>
          <ul className="right hide-on-med-and-down" id="nav-mobile ">
            {this.showHeaderContent()}
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