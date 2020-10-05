import React, {useEffect, useState} from 'react';
import styles from './Popup.module.scss';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSmileBeam, faSadTear} from '@fortawesome/free-solid-svg-icons';

function Popup(props) {
  const [state, setState] = useState({showSuccess: props.sentSurvey});
  const successMessage = <p><span>Survey sent successfully!</span><FontAwesomeIcon icon={faSmileBeam} size={"lg"}/></p>;
  const errorMessage = <p><span>Something went wrong, sorry</span><FontAwesomeIcon icon={faSadTear} size={"lg"}/></p>;

  useEffect(() => {
    if (props.sentSurvey) {
      setState({showError: false, showSuccess: true})
      setTimeout(() => setState({showSuccess: false}), 5000);
    }
  }, [props.sentSurvey]);

  if (state.showSuccess) {
    return <div className={styles.Success}>
      {successMessage}
    </div>;
  }
  if (state.showError) {
    return <div className={styles.Error}>{errorMessage}</div>;
  }
  return null;
}

const mapStateToProps = store => {
  return {
    sentSurvey: store.survey.surveySend,
    error: store.error,
  };
};

export default connect(mapStateToProps)(Popup);