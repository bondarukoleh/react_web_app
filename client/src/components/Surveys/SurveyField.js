import React from "react";
import styles from "./SurveyForm/SurveyForm.module.scss";

/* props here has "input" object with onBlur, onChange, onFocus etc. event handlers added by redux-form
* so we will extract those handlers to our input element we returning.
* */

const SurveyField = ({input, label, meta: {error, touched}}) => {
  return (
    <div className={styles.InputGroup}>
      <label>{label}</label>
      <input style={{marginBottom: '5px'}} {...input}/>
      <div className={styles.RedText}>
        {touched && error}
      </div>
    </div>);
};

export default SurveyField;