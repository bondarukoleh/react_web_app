import React, {Component} from "react";

export class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo" href="/">Emaily App</a>
          <ul className="right hide-on-med-and-down" id="nav-mobile ">
            <li><a href="/auth/google">Login with Google</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}