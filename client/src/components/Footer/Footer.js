import React from 'react';
import styles from './Footer.module.scss'
import {withRouter} from "react-router-dom";

const Footer = (props) => {
  const classes = [styles.Footer];
  props.location.pathname !== '/' &&  classes.push(styles.FixedFooter);

  return (<footer id='footer' className={classes.join(' ')}>
    <p>Copyright &copy; 2020. All Rights Reserved</p>
  </footer>);
};

export default withRouter(Footer);