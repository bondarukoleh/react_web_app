import React, {Component} from "react";
import Survey from "./Survey";
import {fetchSurveysActionCreator, deleteSurveyActionCreator} from "../../actions/survey.actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import styles from './Surveys.module.scss';
import Payments from "../Payment/Payments";

class Surveys extends Component {
  state = {
    sorting: 'desc'
  };

  componentDidMount() {
    this.props.fetchSurveys();
  }

  sortByDate = (surveyA, surveyB) => {
    if (this.state.sorting === 'desc') {
      return new Date(surveyA.dateSent).getTime() - new Date(surveyB.dateSent).getTime();
    }
    return new Date(surveyB.dateSent).getTime() - new Date(surveyA.dateSent).getTime();
  };

  renderNoCredits = () => {
    return <div className={styles.CenterText}>
      <h1>Oops... No credit yet!</h1>
      <Payments/>
    </div>;
  };

  renderNoSurveys = () => {
    return <div className={styles.CenterText}>
      <h1>Oops... No credit yet!</h1>
      <Link to='/' className={styles.btn_red}>Add credit</Link>
      <Payments/>
    </div>;
  };

  renderSurveys = () => {
    const {surveys, deletedSurvey, deleteSurvey, user} = this.props;
    if (surveys === null) {
      return <div>Fetching your surveys...</div>;
    }
    if (user && !user.credit) {
      return this.renderNoCredits();
    }
    if (surveys === false || !surveys.length) {
      return this.renderNoSurveys();
    }
    return <div>
      <button className="btn-small"
              style={{margin: '5px'}}
              onClick={() => this.setState({sorting: 'asc'})}>New on the top
      </button>
      <button className="btn-small"
              style={{margin: '5px'}}
              onClick={() => this.setState({sorting: 'desc'})}>New on the bottom
      </button>
      {surveys.sort(surveys.length ? 1 && this.sortByDate : undefined).map((survey) => {
        return <Survey
          survey={survey}
          deletedSurvey={deletedSurvey}
          deleteSurvey={deleteSurvey}
          key={survey.id}
        />;
      })}
    </div>;
  };

  render() {
    return <div className={styles.Surveys}>
      {this.renderSurveys()}
    </div>;
  }
}

const mapStateToProps = store => {
  return {
    surveys: store.survey.fetchSurveys,
    deletedSurvey: store.survey.deleteSurvey,
    user: store.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSurveys: () => dispatch(fetchSurveysActionCreator()),
    deleteSurvey: (surveyID) => dispatch(deleteSurveyActionCreator(surveyID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Surveys);