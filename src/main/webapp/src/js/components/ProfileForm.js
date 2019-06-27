import React from 'react';
import {
  Container,  Button,Row,  Col,  Card,  CardHeader,  ListGroup,  ListGroupItem,  Form,   Alert} from "shards-react";

import Websocket from 'react-websocket';
import SockJsClient from 'react-stomp'
import UserService from '../api/UserService'
import autoBind from 'react-autobind'
import _ from 'lodash'
var formData = new FormData()
var userId= localStorage.getItem('idUser')



export class ProfileForm extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this)
        this.state = {
            name: '',
            email:'',
            avatar:'',
            clientConnected:false,
            updateSent: true, 
            lastUpdateDate:''
        };



    }


    componentWillUnmount() {
        this.canceler.cancel();
    }
        componentWillMount(){
        UserService.getUserInfo(userId, this.userInfoCallback)
        }

      userInfoCallback(response){
          this.setState({
              name: response.name,
              email:response.email,
              avatar:response.avatar,
              lastUpdateDate:  response.lastUpdate
          })

      }



    onNameChange(e) {
      this.setState({
          name: e.target.value,
      });
      console.log(this.state.name)
  }
  onEmailChange(e) {
      this.setState({
          email: e.target.value,
      });
  }
  onAvatarChange(e) {
      this.setState({
          avatar: e.target.files[0]
      });

  }
handleMessage(data){
  if(data){
      this.synchronize()
  }
}
  handleSave() {
      this.setState({updateSent:false})
    formData.append('name', this.state.name)
    formData.append('email', this.state.email)
    formData.append('avatar', this.state.avatar)
    formData.append('updateDate', new Date())

if(this.state.clientConnected){
    UserService.update(userId, formData, this.updateCallback)

}else{
    this.setState({updateSent: false})
    localStorage.setItem('name',this.state.name)
    localStorage.setItem('email',this.state.email)
    localStorage.setItem('avatar', this.state.avatar)
    localStorage.steItem('updateDate', new Date())

}


  }

  updateCallback(res){
      if(res){
          this.setState({updateSent: true})
      }
  }
  synchronize(){
      if(!this.state.updateSent ){
   
        formData.append('name', localStorage.getItem('name'))
        formData.append('email', localStorage.getItem('email'))
        formData.append('avatar', localStorage.getItem('avatar') )
        formData.append('updateDate', localStorage.getItem('updateDate') )

    
        UserService.update(userId, formData, this.updateCallback)
        this.setState({updateSent: true})

        ///Share updates with clients 
        UserService.getHistory(userId,  this.updateHistoryCallback)

    }
      
  }
  updateHistoryCallback(response){
    var nameUpdates=_.orderBy(_.find(response, function(o) { return o.fieldName == 'name'; }), [function(o) { return o.dateUpdate; }],['desc'])
    var emailUpdates=_.orderBy(_.find(response, function(o) { return o.fieldName == 'email'; }), [function(o) { return o.dateUpdate; }],['desc'])
    var   avatarUpdates=  _.orderBy(_.find(response, function(o) { return o.fieldName == 'avatar'; }), [function(o) { return o.dateUpdate; }],['desc'])
this.setState({
    name:_.head(nameUpdates).value,
    email:_.head(emailUpdates).value,
    avatar:_.head(avatarUpdates).value

})


}

    render() {
        return (
            <Container  style={{ "margin":"auto", "width":"80%"}}>

            {!this.state.clientConnected && 
            <Row > You are offline</Row>}


                <Row pad="medium" border={{ side: 'top', color: 'light-3' }}>
                    <h5 level="3" margin="none">
                        Edit Profile
                    </h5>
                </Row>
                <Row>
                <input onChange={this.onNameChange} value={this.state.name}/>

                </Row><br/>
                <Row >
                <input onChange={this.onEmailChange}  value={this.state.email}/>

                </Row>
                <br/>
                <Row >
                    <Col lg="6">
                    <div className="custom-file mb-3">
                                <input type="file" onChange={this.onAvatarChange} className="custom-file-input" id="customFile2" />
                                <label className="custom-file-label" htmlFor="customFile2">
                                </label>
                              </div>
                    </Col>
                    <Col lg="6">
                    <img src={this.state.avatar} />
                    </Col>
                              
                </Row><br/>

                <Button size="sm" className="btn-enregister mb-2 mr-1" onClick={this.handleSave.bind(this)}>
                        Save
                      </Button>

                      <SockJsClient
                                         url={`http://localhost:8012`} topics={['/topic/all']}
                                         onMessage={(message) => this.handleMessage(message)}
                                         onConnect={ () => { this.setState({ clientConnected: true }) } }
                                         onDisconnect={ () => { this.setState({ clientConnected: false }) } }
                                         />
            </Container>
        );
    }
}

export default ProfileForm;
