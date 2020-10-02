import React, {Component} from "react";
import styles from './Survey.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class Survey extends Component {
  deleteSurvey = async () => {
    const {survey: {id}, deleteSurvey} = this.props;
    await deleteSurvey(id);
  };

  showWarning = () => {
    window.confirm("Are you sure you want to delete the survey?") && this.deleteSurvey();
  };

  render() {
    const {survey: {body, dateSent, no, title, yes}} = this.props;
    return (
      <div className={styles.SurveyCard}>
        <div className={styles.CardContent}>
          <p><span>{title}</span> - {body}</p>
          <p><span>Send date</span> {new Date(dateSent).toLocaleString()}</p>
        </div>
        <hr/>
        <div className={styles.CardActions}>
          <div>
            <p><span>Yes voted count:</span> {yes}</p>
            <p><span>No voted count:</span> {no}</p>
          </div>
          <button onClick={this.showWarning}> <FontAwesomeIcon icon={faTrash} size={"lg"} /></button>
        </div>
      </div>
    );
  }
}

export default Survey;