import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
//import { Link, Location } from 'react-router-dom';
import { Link, Location } from 'react-router';
import {Image,Glyphicon} from 'react-bootstrap'
import $ from 'jquery'

class Navigation extends Component {

    componentDidMount() {
        const { menu } = this.refs;
        $(menu).metisMenu();
    }

    activeRoute(routeName) {

      return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    secondLevelActive(routeName) {
      return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    }

    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                    <ul className="nav metismenu" id="side-menu" ref="menu">
                        <li className="nav-header">
                            <div className="dropdown profile-element"> <span>
                             </span>


                            </div>

                        </li>

                        <li  className={this.activeRoute("/comptesdebiteurs")}>
                            <Link ><i className="fa fa-credit-card"></i> <span className="nav-label">User Profile</span></Link>

                        </li>

                    </ul>

            </nav>
        )
    }
}

export default Navigation
