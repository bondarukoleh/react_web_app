import React, {Component} from "react";
import styles from './Survey.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class Survey extends Component {

  state = {
    showDeleteMenu: false
  }

  deleteSurvey = async () => {
    const {survey: {id}, deleteSurvey} = this.props;
    await deleteSurvey(id);
  };

  showDeleteMenu = () => {
    this.setState(({showDeleteMenu}) => ({showDeleteMenu: !showDeleteMenu}));
  };

  renderDeleteMenu = () => {
    return (
      <div className={styles.Dropdown}>
        <ul>
          <li><button onClick={() => this.showDeleteMenu()}>Cancel</button></li>
          <li><button onClick={() => {
            this.showDeleteMenu();
            this.deleteSurvey();
          }}>Delete</button></li>
        </ul>
      </div>
    )
  }

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
          <button onClick={this.showDeleteMenu}> <FontAwesomeIcon icon={faTrash} size={"lg"} /></button>
          {this.state.showDeleteMenu && this.renderDeleteMenu()}
        </div>
      </div>
    );
  }
}

export default Survey;