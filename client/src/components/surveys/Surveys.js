import React, {Component} from "react";
import Survey from "./Survey";
import {fetchSurveyActionCreator} from "../../actions/survey.actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Surveys extends Component {
  componentDidMount() {
    this.props.fetchSurveys()
  }

  renderSurveys = () => {
    const {surveys} = this.props;
    if(surveys === null){
      return <div>Fetching your surveys...</div>
    } else if(surveys === false || !surveys.length) {
      return <div>You have no surveys yet. <Link to='/surveys/new'>Create</Link> your first one!</div>
    } else {
      return this.props.surveys.reverse().map((survey) => <Survey survey={survey}  key={survey.id}/>)
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
    surveys: store.survey.fetchSurveys
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSurveys: () => dispatch(fetchSurveyActionCreator())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Surveys);