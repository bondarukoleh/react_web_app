import React, {Component} from "react";
import {reduxForm} from 'redux-form';
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

export default reduxForm({form: 'survey'})(NewSurvey); // trick that gives ability to destroy (default behaviour of
// reduxForm) the form values when we left the scope of "New Survey" component.