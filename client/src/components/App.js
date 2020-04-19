import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from './Header';
import Landing from './Landing';
import Dashboard from "./Dashboard";
import Surveys from "./Surveys";
import NewSurvey from "./NewSurvey";
import 'materialize-css/dist/css/materialize.min.css';
import {fetchCurrentUserActionCreator} from '../actions/authActions';
import {connect} from 'react-redux';

class App extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <div className="container">
        <Router>
          <Header/>
          <Switch>
            {/*same as exact={true}*/}
            <Route exact path="/">
              <Landing/>
            </Route>
            <Route exact path="/surveys">
              <Dashboard/>
              <Surveys/>
            </Route>
            <Route exact path="/surveys/new">
              <NewSurvey/>
            </Route>
          </Switch>
        </Router>
      </div>
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