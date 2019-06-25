import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { smoothlyMenu } from '../layouts/Helpers';
import $ from 'jquery'
import userService from '../../api/UserService'
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import {Redirect} from 'react-router-dom';
import { hashHistory } from 'react-router'

class TopHeader extends React.Component {

  constructor(props)
  {
    super(props)
    autoBind(this);
  }

    toggleNavigation(e) {
        e.preventDefault();
        $("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }


    render() {

//if(this.props.loggingIn==false) {history.push('/login');window.location.reload();}
if(!localStorage.getItem('currentUser'))
{
hashHistory.push('/login')
  //history.push('/login');
  //window.location.reload();
}

  return (
      <div className="row border-bottom">
          <nav className="navbar navbar-static-top white-bg" role="navigation" style={{marginBottom: 0}}>
              <div className="navbar-header">
                  <a className="navbar-minimalize minimalize-styl-2 btn btn-success " onClick={this.toggleNavigation} href="#"><i className="fa fa-bars"></i> </a>
              </div>
              <ul className="nav navbar-top-links navbar-right">

                  <li onClick={this.onLogOut}>
                      <a href="#">
                          <i className="fa fa-sign-out "  > </i>
                          Déconnexion
                      </a>
                  </li>

              </ul>
          </nav>
      </div>
  )



    }

}




export default TopHeader;
