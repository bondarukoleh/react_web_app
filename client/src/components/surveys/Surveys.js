import React, {Component} from "react";
import Survey from "./Survey";
import {fetchSurveysActionCreator, deleteSurveyActionCreator} from "../../actions/survey.actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Surveys extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys = () => {
    const {surveys, deletedSurvey, deleteSurvey} = this.props;
    if (surveys === null) {
      return <div>Fetching your surveys...</div>;
    } else if (surveys === false || !surveys.length) {
      return <div>You have no surveys yet. <Link to='/surveys/new'>Create</Link> your first one!</div>;
    } else {
      return this.props.surveys.reverse().map((survey) =>{
        return <Survey
          survey={survey}
          deletedSurvey={deletedSurvey}
          deleteSurvey={deleteSurvey}
          key={survey.id}
        />
      });
    }
  };

  render() {
    return <div>
      {this.renderSurveys()}
    </div>;
  }
}

const mapStateToProps = store => {
  return {
    surveys: store.survey.fetchSurveys,
    deletedSurvey: store.survey.deleteSurvey
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSurveys: () => dispatch(fetchSurveysActionCreator()),
    deleteSurvey: (surveyID) => dispatch(deleteSurveyActionCreator(surveyID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Surveys);