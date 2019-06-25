import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
//import {BrowserRouter as Router , Switch,Route } from 'react-router-dom';
import Main from './js/components/layouts/Main';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import routes from './config/routes';

import jquery from 'jquery';
import metismenu from 'metismenu';

//import bootstrap from 'bootstrap';

import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/font-awesome/css/font-awesome.css'
import './../node_modules/animate.css/animate.min.css'
import './dist/styles/style.css'
import './dist/styles/commonStyle.css'
ReactDOM.render(


  <Main />,
    document.getElementById('root')
);
