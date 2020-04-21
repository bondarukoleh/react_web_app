import React from "react";
// import {reduxForm, Field} from 'redux-form'

/* props here has "input" object with onBlur, onChange, onFocus etc. event handlers added by redux-form
* so we will extract those handlers to our input element we returning.
* */

const SurveyField = ({input, label, meta: {error, touched}}) => {
  return (
    <div>
      <label>{label}</label>
      <input style={{marginBottom: '5px'}} {...input}/>
      <div className="red-text" style={{marginBottom: '20px'}}>
        {touched && error}
      </div>
    </div>);
};

export default SurveyField;