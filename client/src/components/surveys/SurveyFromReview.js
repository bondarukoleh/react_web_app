import React from 'react';
import {connect} from 'react-redux';
import {FIELD_PROPS} from './survey.data';

/* Unlike class component, props here passed as an argument, so no this.props is available */
const SurveyFormReview = ({onCancel, survey}) => {
  const renderFields = () => {
    return (<div>
      {FIELD_PROPS.map(({label, name}) => {
        return <div key={name}>
          <label>{label}</label>
          <div>{survey.values[name]}</div>
        </div>;
      })}
    </div>);
  };

  return (
    <div>
      <h5>Please review entered data</h5>
      <div>
        {renderFields()}
      </div>
      <button className="red btn-flat white-text" onClick={onCancel}>Back</button>
      <button type="submit" className="teal btn-flat right white-text">
        Send Survey
        <i className="material-icons right">done</i>
      </button>
    </div>
  );
};

const mapStateToProps = store => {
  return {
    survey: store.form.survey
  };
};

export default connect(mapStateToProps)(SurveyFormReview);