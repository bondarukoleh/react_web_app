import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';
import logo from '../media/emaily_logo.png';

class Header extends Component {
  state = {
    showSurveyError: false,
    showSurveySuccess: false,
  };

  showHeaderContent = () => {
    const {user} = this.props;
    if (user === null) {
      return <li>Fetching user data...</li>;
    } else if (user === false) {
      return <li><a href="/auth/google">Login with Google</a></li>;
    } else {
      return <React.Fragment>
        <li id="welcome">{`Welcome ${user.name}!`}</li>
        <li id="credits" style={{margin: '0 10px'}}>{`Your credits: ${user.credit}`}</li>
        <li id="add_credits"><Payments/></li>
        <li id="logout"><a href="/api/logout">Logout</a></li>
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
        console.log('RESETING STATE');
        this.setState({showSurveySuccess: false});
      }, 5000);
      return <h5 className="green-text">Survey was send successfully!</h5>;
    }
  }

  render() {
    const {user} = this.props;
    return (
      <nav>
        <div className="nav-wrapper">
          {/*TODO: polish layout of logo*/}
          <Link className="brand-logo left" to={user ? '/surveys' : '/'}>
            <img src={logo} alt="Logo" style={{width: '50px', height: '50px'}}></img>
          </Link>
          <ul className="right hide-on-med-and-down" id="nav-mobile ">
            {this.showHeaderContent()}
          </ul>
        </div>
        {/*{surveySend === false && this.setState({showSurveyError: true, error: surveySend.error})}*/}
        {/*{surveySend === true && this.setState({showSurveySuccess: true})}*/}
      </nav>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: store.auth.user,
    // surveySend: store.survey.surveySend
  };
};

export default connect(mapStateToProps)(Header);