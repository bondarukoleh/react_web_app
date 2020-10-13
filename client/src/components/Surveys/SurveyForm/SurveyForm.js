import React, {Component} from "react";
import {reduxForm, Field} from 'redux-form';
import {Link} from "react-router-dom";
import SurveyField from "../SurveyField";
import {validateEmails} from '../../../utils/validate.emails';
import {FIELD_PROPS} from '../survey.data';
import styles from './SurveyForm.module.scss'

class SurveyForm extends Component {
  renderFields = () => {
    return FIELD_PROPS.map(({label, name}) => {
        return <Field
            label={label}
            component={SurveyField}
            type='text'
            name={name}
            key={name}
          />;
      });
  };

/* component tells that this is an html input element, type says that this is text, not button or radiobutton
      name it's an identification for redux, and it will be automatically renewed when it's value is changed
      <Field component='input' type='text' name='UserName'/>
      handleSubmit - automatically added by reduxForm, we need to pass a callback gets object with props named
       same as Field "name" property */
  render() {
    const {handleSubmit, onSurveySubmit} = this.props;
    return (
      <section className={styles.Wrapper}>
        <div>
          <form className={styles.SurveyForm}>
            {this.renderFields()}
          </form>
          <div className={styles.Controls}>
            <Link to="/surveys" className={styles.btn_grey}>Cancel</Link>
            <Link to='#' onClick={handleSubmit(onSurveySubmit)} type="submit" className={styles.btn_red}>Next</Link>
          </div>
        </div>
      </section>
    );
  }
}

function validate(formValues) {
  const error = {};
  // checking if user provide invalid emails
  error.recipients = validateEmails(formValues.recipients || '');
  // if there no emails at all = then add general error message to fields
  FIELD_PROPS.forEach(({name}) => {
    if (!formValues[name]) {
      error[name] = `You must provide a ${name} to quiz!`;
    }
  });
  return error; // if errors object will be empty, or with properties with falsy values -> redux-form will add
  // corresponded error message to corresponded field, got damn, this is convenient
}

export default reduxForm({form: 'survey', validate, destroyOnUnmount: false})(SurveyForm); // we connected this
// survey form to "survey" property of "form" property of redux store object.