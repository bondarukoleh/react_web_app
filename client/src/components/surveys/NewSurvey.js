import React, {Component} from "react";
import SurveyForm from "./SurveyForm";
import SurveyFromReview from "./SurveyFromReview";

class NewSurvey extends Component {
  state = {showFormReview: false};

  render() {
    const {showFormReview} = this.state;
    if (showFormReview) {
      return <SurveyFromReview onCancel={() => this.setState({showFormReview: false})}/>;
    }
    return <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})}/>;
  }
}

export default NewSurvey;