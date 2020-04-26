import React, {Component} from "react";

class Survey extends Component {
  render() {
    const {body, dateSent, lastResponded, no, subject, title, yes} = this.props.survey;
    return (
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{title}</span>
          <p>Subject: {subject}</p>
          <p>{body}</p>
          <p className="right">Send date: {new Date(dateSent).toLocaleString()}</p>
        </div>
        <div className="card-action">
          <a>Yes voted count: {yes}</a>
          <a>No voted count: {no}</a>
        </div>
      </div>
    );
  }
};

export default Survey;