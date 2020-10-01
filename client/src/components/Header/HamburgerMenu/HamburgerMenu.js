import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './HamburgerMenu.module.scss'
import NavItems from "../NavItems/NavItems";
import Shade from "../../UI/Shade/Shade";

function HamburgerMenu(props) {
  return (
    <React.Fragment>
      <Shade onClick={props.clicked} show={props.sideMenuShown}/>
      <div className={props.sideMenuShown ? styles.CrossBtn : styles.MenuBtn}>
        <input type="checkbox" id="menuToggle" onClick={props.clicked}/>
        <label htmlFor="menuToggle">
          <span></span>
        </label>
      </div>
      <div className={[styles.SideDrawer, props.sideMenuShown ? styles.Open : styles.Closed].join(' ')}>
        <NavItems sideMenuShown={props.sideMenuShown}/>
      </div>
    </React.Fragment>
  );
}

HamburgerMenu.propTypes = {
  sideMenuShown: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired
};

export default HamburgerMenu;