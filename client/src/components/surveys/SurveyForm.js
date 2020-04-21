import React, {Component} from "react";
import {reduxForm, Field} from 'redux-form';
import {Link} from "react-router-dom";
import SurveyField from "./SurveyField";
import {validateEmails} from '../../utils/validate.emails';

const fieldProps = [
  {label: 'Survey Title', name: 'title'},
  {label: 'Subject', name: 'subject'},
  {label: 'Email body', name: 'body'},
  {label: 'Recipient list', name: 'recipients'}
];

class SurveyForm extends Component {
  renderFields = () => {
    return (<div>
      {fieldProps.map(({label, name}) => {
        return <Field label={label} component={SurveyField} type='text' name={name} key={name}/>;
      })}
    </div>);
  };

  render() {
    const {onSurveySubmit} = this.props;
    return (<div>
      {/* component tells that this is an html input element, type says that this is text, not button or radiobutton
      name it's an identification for redux, and it will be automatically renewed when it's value is changed
      <Field component='input' type='text' name='UserName'/>
      handleSubmit - automatically added by reduxForm, we need to pass a callback gets object with props named
       same as Field "name" property */}
      <form onSubmit={onSurveySubmit}>
        {this.renderFields()}
        <Link to="/surveys" className="red btn-flat white-text">
          Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>);
  }
}

function validate(formValues) {
  const error = {};
  // checking if user provide invalid emails
  error.recipients = validateEmails(formValues.recipients || '');
  // if there no emails at all = then add general error message to fields
  fieldProps.forEach(({name}) => {
    if (!formValues[name]) {
      error[name] = `You must provide a ${name} to survey!`;
    }
  });
  return error; // if errors object will be empty, or with properties with falsy values -> redux-form will add
  // corresponded error message to corresponded field, got damn, this is convenient
}

export default reduxForm({form: 'survey', validate})(SurveyForm); // name should be "form", my god, wth