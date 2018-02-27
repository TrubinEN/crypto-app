import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import ProfilePage from "../ProfilePage";

export class PrivateRoute extends Component {
  static defaultProps = {
    currency: ["btc", "eth"]
  };

  render() {
    const { match: { params: { name } } } = this.props;
    const { currency } = this.props;
    if (currency.indexOf(name) === -1) {
      return <Redirect to="/btc" />;
    }
    return <ProfilePage currencyUrl={name} />;
  }
}

export default withRouter(PrivateRoute);
