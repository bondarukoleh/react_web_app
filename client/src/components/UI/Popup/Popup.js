import React, {useEffect, useState} from 'react';
import styles from './Popup.module.scss';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSmileBeam, faSadTear} from '@fortawesome/free-solid-svg-icons';

function Popup(props) {
  const {surveySend} = props.survey;
  const [state, setState] = useState({showSuccess: surveySend});
  const successMessage = <p><span>Survey sent successfully!</span><FontAwesomeIcon icon={faSmileBeam} size={"lg"}/></p>;
  const errorMessage = <p><span>Something went wrong, sorry</span><FontAwesomeIcon icon={faSadTear} size={"lg"}/></p>;

  useEffect(() => {
    if (surveySend) {
      setState({showError: false, showSuccess: true})
      setTimeout(() => setState({showError: false, showSuccess: false}), 5000);
    }
  }, [props.survey]);

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
    survey: store.survey,
    error: store.error,
  };
};

export default connect(mapStateToProps)(Popup);