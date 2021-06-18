import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import styles from './Landing.module.scss'
import greetingImage from '../../assets/greeting.png'
import Steps from "./Steps/Steps";

class Landing extends Component {
  render() {
    const {user} = this.props;

    return (
      <main id='main' className={styles.Content}>
        <section className={styles.Greeting}>
          <h1>Create your quiz with fast response</h1>
          <img src={greetingImage} alt="Greeting_picture"/>
          {user
              ? <Link to='/surveys' className={styles.btn_red}>Got to your surveys.</Link>
              : <a href="/auth/google" className={styles.btn_red}>Login with Google</a>
          }
        </section>
        <Steps/>
      </main>
    )
  }
}

const mapStateToProps = store => {
  return {
    user: store.auth.user
  };
};

export default connect(mapStateToProps)(Landing);
