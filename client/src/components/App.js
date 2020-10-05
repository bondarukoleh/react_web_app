import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from './Header/Header';
import Landing from './Landing/Landing';
import Footer from "./Footer/Footer";
import Dashboard from "./Dashboard";
import NewSurvey from "./Surveys/NewSurvey/NewSurvey";
import {fetchCurrentUserActionCreator} from '../actions/auth.actions';
import {connect} from 'react-redux';
import '../sass/_reset.scss'
import '../sass/_config.scss'
import Popup from "./UI/Popup/Popup";

class App extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
        <Router>
          {/* Need to figure out why it's not working in prod */}
          <Popup/>
          <Header/>
          <Switch>
            {/*same as exact={true}*/}
            <Route exact path="/">
              <Landing/>
            </Route>
            <Route exact path="/surveys">
              <Dashboard/>
            </Route>
            <Route exact path="/surveys/new">
              <NewSurvey/>
            </Route>
          </Switch>
          <Footer/>
        </Router>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: store.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => dispatch(fetchCurrentUserActionCreator())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);