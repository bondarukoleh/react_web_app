import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

class Landing extends Component {
  render() {
    const {user} = this.props;

    const divStyle = {
      textAlign: 'center'
    };

    return <div style={divStyle}>
      <h2>Emaily!</h2>
      <p>Collect feedback about your application easily!</p>
      <div>
        {user
          ? <Link to='/surveys'>Got to your surveys.</Link>
          : <p>Please <strong>login</strong> and <strong>add a credit</strong> to make a new survey!</p>}
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