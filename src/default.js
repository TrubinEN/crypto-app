import React, { Component } from "react";
import { connect } from "react-redux";

export class App extends Component {
    render() {
        return 'App';
  }
}

const mapStateToProps = state => ({
 // state: get(state),
});

const mapDispathToProps = {
//  logout
};

export default withRouter(
  connect(mapStateToProps, mapDispathToProps)(App)
);