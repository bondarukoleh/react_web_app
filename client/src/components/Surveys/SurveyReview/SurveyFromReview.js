import React, {useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {FIELD_PROPS} from '../survey.data';
import {sendSurveyActionCreator} from "../../../actions/survey.actions";
import styles from './SurveyFormRevie.module.scss';
import Modal from "../../UI/Modal/Modal";


/* Unlike class component, props here passed as an argument, so no this.props is available */
const SurveyFormReview = ({onCancel, survey, sendSurvey, history}) => {
  const [state, setState] = useState({showModal: false});

  const renderFields = () => FIELD_PROPS.map(({label, name}) => {
    return <div key={name} className={styles.InputGroup}>
      <label>{label}</label>
      <div>{survey.values[name]}</div>
    </div>;
  });

  const sendSurveyData = async () => {
    try {
      await sendSurvey(survey.values);
      history.push('/surveys');
    } catch (e) {
    }
  };

  const showModal = () => {
    return <Modal shadeClick={() => setState({showModal: false})} show={state.showModal}>
      <div className={styles.SentSurvey}>
        <div>
          <h2>Your quiz will be sent. <br/> Are you sure?</h2>
            <button className={styles.btn_grey} onClick={() => setState({showModal: false})}>Back</button>
            <button type="submit" className={styles.btn_red} onClick={sendSurveyData}>Send</button>
        </div>
      </div>
    </Modal>;
  };

  return (
    <section className={styles.Wrapper}>
      <div>
        <h3>Review your entered data.</h3>
        <section className={styles.SurveyForm}>
          {renderFields()}
        </section>
        <div className={styles.Controls}>
          <button className={styles.btn_grey} onClick={onCancel}>Back</button>
          <button
            type="submit"
            className={styles.btn_red}
            onClick={() => setState({showModal: true})}>Send Quiz</button>
        </div>
        {state.showModal && showModal()}
      </div>
    </section>
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