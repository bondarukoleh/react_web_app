import React from 'react';
import Step from "./Step/Step";
import styles from './Steps.module.scss'
import step1Icon from '../../../assets/steps/step1.svg'
import step2Icon from '../../../assets/steps/step2.svg'
import step3Icon from '../../../assets/steps/step3.svg'
import step4Icon from '../../../assets/steps/step4.svg'

const Steps = () => {
  const renderSteps = () => {
    const steps = [
      {left: true, circleColor: 'circle_red', icon: step1Icon, stepDescription: 'Login with Google account', stepNum: 1},
      {left: false, circleColor: 'circle_yellow', icon: step2Icon, stepDescription: 'Add credit', stepNum: 2},
      {left: true, circleColor: 'circle_green', icon: step3Icon, stepDescription: 'Create quiz', stepNum: 3},
      {left: false, circleColor: 'circle_blue', icon: step4Icon, stepDescription: 'Collect the result', stepNum: 4},
    ];

    return steps.map(step => <Step {...step}/>);
  }

  return (
    <section className={styles.Steps}>
      <h3 className={styles.StepExplanation}>For start you need do 4 easy steps:</h3>
      {renderSteps()}
    </section>
  );
};

export default Steps;