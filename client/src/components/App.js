import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Header} from  './Header'
import 'materialize-css/dist/css/materialize.min.css'
import * as authActions from '../actions/authActions'
import {connect} from 'react-redux';

export class App extends Component {
  componentDidMount() {
    const {getUser} = this.props;
    console.log(this.props)
    // getUser()
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

function Landing() {
  return (
    <div>
      <h2>Landing</h2>
    </div>
  );
}


const mapStateToProps = store => {
  return {
    user: store.user
  };
};

export default connect(mapStateToProps, authActions)(App);