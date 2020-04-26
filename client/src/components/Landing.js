import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

class Landing extends Component {
  render() {
    const divStyle = {
      textAlign: 'center'
    };

    return <div style={divStyle}>
      <h2>Emaily!</h2>
      <p>Collect feedback about your application easily!</p>
      <div>
        <Link to='/surveys'>Got to your surveys.</Link>
      </div>
    </div>;
  }
}

const mapStateToProps = store => {
  return {
    user: store.auth.user
  };
};

export default connect(mapStateToProps)(Landing);