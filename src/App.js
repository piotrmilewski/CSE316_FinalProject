import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import Navbar from './components/navbar/Navbar.js';
import RegisterScreen from './components/register_screen/RegisterScreen.js';
import SplashScreen from './components/splash_screen/SplashScreen.js';
import HomeScreen from './components/home_screen/HomeScreen.js';
import EditScreen from './components/edit_screen/EditScreen.js';
import DatabaseTester from './test/DatabaseTester'

class App extends Component {
  render() {
    const { auth } = this.props;

    // if auth is loaded then we render App.
    // But if not then we doesn't render the one.
    if (auth.isLoaded) {
      return (
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route path="/test" component={DatabaseTester} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/splash" component={SplashScreen} />
              <Route path="/wireframe/:id" component={EditScreen} />
              <Route path="/:any" component={HomeScreen} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(App);