import React, {Component} from "react";
import styles from './Survey.module.scss';
import remove from '../../../assets/delete.png';

class Survey extends Component {
  deleteSurvey = async () => {
    const {survey: {id}, deleteSurvey} = this.props;
    await deleteSurvey(id);
  };

  showWarning = () => {
    window.confirm("Are you sure you want to delete the survey?") && this.deleteSurvey();
  };

  render() {
    const {survey: {body, dateSent, no, subject, yes}} = this.props;
    return (
      <div className={styles.SurveyCard}>
        <div className={styles.CardContent}>
          <p><span>{subject}</span> - {body}</p>
          <p><span>Send date</span> {new Date(dateSent).toLocaleString()}</p>
        </div>
        <hr/>
        <div className={styles.CardActions}>
          <div>
            <p><span>Yes voted count:</span> {yes}</p>
            <p><span>No voted count:</span> {no}</p>
          </div>
          <button onClick={this.showWarning}><img src={remove} alt='remove'/></button>
        </div>
      </div>
    );
  }
};

export default Survey;