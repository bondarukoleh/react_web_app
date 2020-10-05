import React from 'react';
import styles from "./NavItems.module.scss";
import userIcon from "../../../assets/user_icon.svg";
import Payments from "../../Payment/Payments";
import {connect} from "react-redux";
import PropTypes from "prop-types";

function NavItems(props) {
  const showHeaderContent = () => {
    const {user} = props;
    if (user === null) {
      return <li>Fetching user data...</li>
    } else if (user === false) {
      return <li><a href="/auth/google" className={styles.btn_red}>Login with Google</a></li>
    } else {
      return <React.Fragment>
        <li><span>{`Hi ${user.name}!`}</span>
          <span>{` You have credits: ${user.credit ? user.credit : 0}`}</span><img src={userIcon} alt="user_icon"/></li>
        <li id="add_credits"><Payments/></li>
        <li><a href="/api/logout" className={props.sideMenuShown ? styles.btn_grey : styles.btn_dark}>Logout</a></li>
        {/*We will sent full request to backend with browser refresh,
         but we also could handle this click via creating action "USER_LOGOUT", make inner ajax request to backend,
         without refresh, clear store etc.*/}
      </React.Fragment>;
    }
  };

  const classes = [styles.NavItems];
  props.sideMenuShown && classes.push(styles.InSideMenu)

  return <ul className={classes.join(' ')}>
    {showHeaderContent()}
  </ul>;
}

const mapStateToProps = store => {
  return {
    user: store.auth.user,
  };
};

NavItems.propTypes = {
  sideMenuShown: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(NavItems);