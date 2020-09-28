import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from '../Payment/Payments';
import logo from '../../assets/logo.svg';
import userIcon from '../../assets/user_icon.svg';
import styles from './Header.module.scss'

class Header extends Component {
  state = {
    showSurveyError: false,
    showSurveySuccess: false,
  };

  showHeaderContent = () => {
    const {user} = this.props;
    if (user === null) {
      return <li>Fetching user data...</li>
    } else if (user === false) {
      return <li><a href="/auth/google" className={styles.btn_red}>Login with Google</a></li>
    } else {
      return <React.Fragment>
        <li><span>{`Hi ${user.name}, you have credits: ${user.credit ? user.credit : 0}`}</span><img src={userIcon} alt="user_icon"/></li>
        <li id="add_credits"><Payments/></li>
        <li><a href="/api/logout" className={styles.btn_dark}>Logout</a></li>
        {/*We will sent full request to backend with browser refresh,
         but we also could handle this click via creating action "USER_LOGOUT", make inner ajax request to backend,
         without refresh, clear store etc.*/}
      </React.Fragment>;
    }
  };

  componentDidMount() {
    const {showSurveyError, showSurveySuccess, error} = this.state;
    if (showSurveyError) {
      setTimeout(() => {
        this.setState({showSurveyError: false});
      }, 5000);
      return <h5 className="red-text">{`Survey was not send, something went wrong, sorry ${error && error}`}</h5>;
    }
    if (showSurveySuccess) {
      setTimeout(() => {
        this.setState({showSurveySuccess: false});
      }, 5000);
      return <h5 className="green-text">Survey was send successfully!</h5>;
    }
  }

  render() {
    const {user} = this.props;
    return (
      <header className={styles.Header}>
        <nav className={styles.Navbar}>
          <Link className={styles.Logo} to={user ? '/Surveys' : '/'}>
            <img src={logo} alt="Logo"/>
          </Link>
          <ul className={styles.NavItems}>
            {this.showHeaderContent()}
          </ul>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: store.auth.user,
  };
};

export default connect(mapStateToProps)(Header);