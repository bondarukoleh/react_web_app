import React, {Component} from "react";

class Survey extends Component {
  deleteSurvey = async () => {
    const {survey: {id}, deleteSurvey} = this.props;
    await deleteSurvey(id);
  };

  showWarning = () => {
    window.confirm("Are you sure you want to delete the survey?") && this.deleteSurvey();
  };

  render() {
    const {survey: {body, dateSent, no, subject, title, yes}} = this.props;
    return (
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{title}</span>
          <p>Subject: {subject}</p>
          <p>{body}</p>
          <p className="right">Send date: {new Date(dateSent).toLocaleString()}</p>
        </div>
        <div className="card-action">
          <a href='/#'>Yes voted count: {yes}</a>
          <a href='/#'>No voted count: {no}</a>
          <a href='/surveys' onClick={this.showWarning} className="right yellow-text">Delete survey</a>
        </div>
      </div>
    );
  }
};

export default Survey;