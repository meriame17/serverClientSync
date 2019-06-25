import React from 'react'
import Main from '../js/components/layouts/Main';


import {  Router, IndexRedirect, browserHistory, hashHistory} from 'react-router';
import { Switch,Route } from 'react-router-dom';
import { useBasename } from 'history'


//import {BrowserRouter as Router , Switch,Route } from 'react-router-dom';
export default (
    <Router  history={ useBasename(() => hashHistory)({ basename: '/Profile' }) }>
       <Switch>
        <Route path="/" component={Main}>

        </Route>

           </Switch>
    </Router>

);
