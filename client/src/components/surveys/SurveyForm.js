import React, {Component} from "react";
import {reduxForm, Field} from 'redux-form';
import SurveyField from "./SurveyField";

class SurveyForm extends Component {
  renderFields = () => {
    const fieldProps = [
      {label: 'Survey Title', name: 'title'},
      {label: 'Subject', name: 'subject'},
      {label: 'Email body', name: 'body'},
      {label: 'Recipient list', name: 'recipients'}
    ];

    return (<div>
      {fieldProps.map(({label, name}) => {
        return <Field label={label} component={SurveyField} type='text' name={name} key={name}/>
      })}
    </div>);
  };

  render() {
    return (<div>
      {/* component tells that this is an html input element, type says that this is text, not button or radiobutton
      name it's an identification for redux, and it will be automatically renewed when it's value is changed
      <Field component='input' type='text' name='UserName'/>
      handleSubmit - automatically added by reduxForm, we need to pass a callback gets object with props named
       same as Field "name" property */}
      <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
        {this.renderFields()}
        <button type='submit'>Submit</button>
      </form>
    </div>);
  }
}

export default reduxForm({form: 'survey'})(SurveyForm);