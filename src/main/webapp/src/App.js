import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';




import 'bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter as Router , Switch,Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router >
               <Switch>
                  <Route exact path='/' component={MainView} />
  
                  
               </Switch>
      </Router>
    );
  }
}

export default App;
