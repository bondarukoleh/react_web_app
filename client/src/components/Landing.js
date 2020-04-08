import React, {Component} from "react";
import {connect} from 'react-redux';

class Landing extends Component {
  render() {
    const divStyle = {
      textAlign: 'center'
    };

    return <div style={divStyle}>
      <h2>Emaily!</h2>
      Collect feedback about your application easily!
    </div>;
  }
}

const mapStateToProps = store => {
  return {
    user: store.auth.user
  };
};

export default connect(mapStateToProps)(Landing);