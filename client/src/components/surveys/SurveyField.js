import React from "react";
// import {reduxForm, Field} from 'redux-form'

/* props here has "input" object with onBlur, onChange, onFocus etc. event handlers added by redux-form
* so we will extract those handlers to our input element we returning.
* */

const SurveyField = ({input, label}) => {
  return (<div>
    <label>{label}</label>
    <input {...input}/>
  </div>);
};

export default SurveyField;