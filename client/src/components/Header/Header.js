import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.svg';
import styles from './Header.module.scss'
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import NavItems from "./NavItems/NavItems";

class Header extends Component {
  state = {
    showSurveyError: false,
    showSurveySuccess: false,
    showSideMenu: false
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

  changeShowState = () => this.setState(({showSideMenu}) => ({showSideMenu: !showSideMenu}))

  render() {
    return (
      <header className={styles.Header}>
          <HamburgerMenu clicked={this.changeShowState} sideMenuShown={this.state.showSideMenu}/>
          <nav className={styles.Navbar}>
            <div>
              <Link className={styles.Logo} to={'/'}>
                <img src={logo} alt="Logo"/>
              </Link>
            </div>
            <NavItems sideMenuShown={false}/>
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