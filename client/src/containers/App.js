import React, { Component } from 'react';
import { connect } from 'react-redux';
import Register from './register';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Authenticate from './authenticate';
import Dashboard from './dashboard';
import  history  from '../utils/history';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter history={history}>
        <div className="App">
          <Route exact path='/register' component={Register}/>
          <Route exact path='/authenticate' component={Authenticate}/>
          <PrivateRoute exact path='/' component={Dashboard}/>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
    auth: store.auth,
    dashboard: store.dashboard
  }
}

export default connect(mapStateToProps)(App);
