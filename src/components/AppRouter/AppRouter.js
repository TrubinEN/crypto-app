import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "../HomePage";
import PrivateRoute from "../PrivateRoute";
import { getIsAuthorized } from "../../reducers/auth";
import "../../static/css/normalize.css";

export class AppRouter extends Component {
  render() {
    const { isAuthorized } = this.props;

    return (
      <Switch>
        {isAuthorized && (
          <Route path="/trade/:name" exact component={PrivateRoute} />
        )}
        {isAuthorized && <Redirect to="/trade/btc" />}
        <Route path="/" exact component={HomePage} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state)
});

export default withRouter(connect(mapStateToProps)(AppRouter));
