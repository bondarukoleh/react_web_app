import React from 'react';
import style from './Shade.module.scss';
import PropTypes from 'prop-types';

const Shade = (props) => {
  return (
    props.show ? <div
      className={style.Shade}
      onClick={props.onClick}
    /> : null
  );
};

Shade.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Shade;
