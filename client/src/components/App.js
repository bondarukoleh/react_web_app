import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from './Header';
import Landing from './Landing';
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
              <SurveyNew/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

function SurveyNew() {
  return (
    <div>
      <h2>SurveyNew</h2>
    </div>
  );
}

function Surveys() {
  return (
    <div>
      <h2>Surveys</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
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