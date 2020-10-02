import React, {Component} from "react";
import Survey from "./SurveyCard/Survey";
import {fetchSurveysActionCreator, deleteSurveyActionCreator} from "../../actions/survey.actions";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import styles from './Surveys.module.scss';
import Payments from "../Payment/Payments";
import createQuiz from '../../assets/createQuiz.png'
import SortingDropdown from "./SortingDropdown/SortingDropdown";

class Surveys extends Component {
  state = {
    sorting: 'desc'
  };

  componentDidMount() {
    this.props.fetchSurveys();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.deletedSurvey !== this.props.deletedSurvey) {
      this.props.fetchSurveys();
    }
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
    return <div className={[styles.CreateQuiz, styles.NoBg].join(' ')}>
      <h1>Cool! Let’s start create quiz.</h1>
      <h3>You can create more quiz as you want.</h3>
      <Link to='/surveys/new' className={styles.btn_red}>Create Quiz</Link>
      <div>
        <img src={createQuiz} alt=""/>
      </div>
    </div>;
  };

  ascSorting = () => this.setState({sorting: 'asc'});
  descSorting = () => this.setState({sorting: 'desc'});

  renderSurveys = () => {
    const {surveys, deletedSurvey, deleteSurvey, user} = this.props;
    if (surveys === null) {
      return <div>Fetching your surveys...</div>;
    }
    if (user && !user.credit && !surveys.length) {
      return this.renderNoCredits();
    }
    if (surveys === false || !surveys.length) {
      return this.renderNoSurveys();
    }
    return <section className={styles.SurveyCards}>
      <div className={styles.SurveyCardsHeader}>
        <button className={styles.btn_red} onClick={() => this.props.history.push('/surveys/new')}>Create Quiz</button>
        <SortingDropdown ascSorting={this.ascSorting} descSorting={this.descSorting}/>
      </div>
      <div className={styles.Wrapper}>
        {surveys.sort(surveys.length ? 1 && this.sortByDate : undefined).map((survey) => {
          return <Survey
            survey={survey}
            deletedSurvey={deletedSurvey}
            deleteSurvey={deleteSurvey}
            key={survey.id}
          />;
        })}
      </div>
    </section>;
  };

  render() {
    const {user, surveys} = this.props;
    const classes = [styles.Surveys];
    if(user && !user.credit && !surveys?.length) {
      classes.push(styles.NoSurveysBg)
    }
    return <section className={classes.join(' ')}>
      {this.renderSurveys()}
    </section>;
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Surveys));