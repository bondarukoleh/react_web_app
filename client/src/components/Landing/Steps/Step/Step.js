import React from 'react';
import styles from './Step.module.scss'
import PropTypes from 'prop-types'

const Step = (props) => {
  return (
    <div className={props.left ? styles.StepLeftAside : styles.StepRightAside}>
      <div className={styles[props.circleColor]}/>
      <img src={props.icon} alt="step"/>
        <div className={styles.StepDesc}>
          <div>
            <h3>{`Step ${props.stepNum}`}</h3>
            <div className={styles.line}/>
          </div>
          <span>{props.stepDescription}</span>
        </div>
    </div>
  );
};

Step.propTypes = {
  left: PropTypes.bool.isRequired,
  circleColor: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  stepDescription: PropTypes.string.isRequired,
  stepNum: PropTypes.number.isRequired
}

export default Step;