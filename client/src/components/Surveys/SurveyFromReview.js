import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {FIELD_PROPS} from './survey.data';
import {sendSurveyActionCreator} from "../../actions/survey.actions";

/* Unlike class component, props here passed as an argument, so no this.props is available */
const SurveyFormReview = ({onCancel, survey, sendSurvey, history}) => {
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

  const sendSurveyData = async () => {
    try {
      await sendSurvey(survey.values);
      history.push('/Surveys');
    } catch (e) {
    }
  };

  const showWarning = () => {
    window.confirm("Real emails will be sent, are you sure?") && sendSurveyData();
  };

  return (
    <div>
      <h5>Please review entered data</h5>
      <div>
        {renderFields()}
      </div>
      <button className="red btn-flat white-text" onClick={onCancel}>Back</button>
      <button type="submit" className="teal btn-flat right white-text" onClick={showWarning}>
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = store => {
  return {
    survey: store.form.survey
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendSurvey: (survey) => dispatch(sendSurveyActionCreator(survey))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SurveyFormReview));