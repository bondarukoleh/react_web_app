import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './SortingDropdown.module.scss';

const SortingDropdown = (props) => {
  const [state, setState] = useState({sortingShown: false});

  const showSorting = () => {
    setState(({sortingShown}) => ({sortingShown: !sortingShown}));
  };

  return (
    <div className={styles.Dropdown}>
      <input id={"sortingToggle"} type={'checkbox'} checked={state.sortingShown} onChange={showSorting}/>
      <label htmlFor="sortingToggle">
        <span></span>
      </label>
      <ul className={state.sortingShown ? styles.Shown : styles.Hide}>
        <li><button
          onClick={() => {
          props.ascSorting();
          showSorting();
        }}>New on top</button></li>
        <li><button onClick={() => {
          props.descSorting();
          showSorting();
        }}>Old on top</button></li>
      </ul>
    </div>
  );
};

SortingDropdown.propTyes = {
  ascSorting: PropTypes.func.isRequired,
  descSorting: PropTypes.func.isRequired
};

export default SortingDropdown;

