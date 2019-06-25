import React from 'react';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import TopHeader from '../common/TopHeader';
import { correctHeight, detectBody } from './Helpers';
import { Dropdown } from 'react-bootstrap';
import { smoothlyMenu } from '../layouts/Helpers';
import $ from 'jquery'
import autoBind from 'react-autobind';
import ProfileForm from '../ProfileForm'

class Main extends React.Component {
  constructor(props)
  {
    super(props);
    autoBind(this);
this.state =
    {
      user: ''
    }
  }


    render() {
    //  this.setState({user:"this.props.connectedUser" })


        let wrapperClass = "gray-bg "
        return (
            <div id="wrapper">

                <div id="page-wrapper" className={wrapperClass}>

                    <TopHeader />

                    <ProfileForm/>
                    <Footer/>
                </div>

            </div>

        )
    }

    componentDidMount() {
    //  this.props.dispatch(userActions.FetchConnectedUser());
      this.state.user=this.props.connectedUser
        // Run correctHeight function on load and resize window event
        $(window).bind("load resize", function() {
            correctHeight();
            detectBody();
        });

        // Correct height of wrapper after metisMenu animation.
        $('.metismenu a').click(() => {
            setTimeout(() => {
                correctHeight();
            }, 300)
        });
    }
}



export default Main
