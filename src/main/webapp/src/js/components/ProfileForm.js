import React from 'react';
import {
  Container,  Button,Row,  Col,  Card,  CardHeader,  ListGroup,  ListGroupItem,  Form,   Alert} from "shards-react";

import Websocket from 'react-websocket';
import SockJsClient from 'react-stomp'
import UserService from '../api/UserService'
import autoBind from 'react-autobind'
var formData = new FormData()
var userId= localStorage.getItem('idUser')


 function syncBackendLocal(){


 }

export class ProfileForm extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this)
        this.state = {
            name: '',
            email:'',
            avatar:'',
            clientConnected:false,
            userUptoDate: true, 
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
      this.setState({userUptoDate:false})
    formData.append('name', this.state.name)
    formData.append('email', this.state.email)
    formData.append('avatar', this.state.avatar)

if(this.state.clientConnected){
    UserService.update(userId, formData, this.updateCallback)

}else{
    this.setState({userUptoDate: false})
    localStorage.setItem('name',this.state.name)
    localStorage.setItem('email',this.state.email)
    localStorage.setItem('avatar', this.state.avatar)
    localStorage.steItem('updateDate', new Date())

}

      this.props.db.put({
          _id: new Date().toJSON(),
          data: formData
      });
  }

  updateCallback(res){
      if(res){
          this.setState({userUptoDate: true})
      }
  }
  synchronize(){
      if(!this.state.userUptoDate ){
        UserService.getUserInfo(userId, this.userInfoCallback)
    if (this.state.date.getTime() < localStorage.getItem('updateDate'))
    {
        formData.append('name', localStorage.getItem('name'))
        formData.append('email', localStorage.getItem('email'))
        formData.append('avatar', localStorage.getItem('avatar') )
    
        UserService.update(userId, formData, this.updateCallback)

    }else{
        this.setState({userUptoDate: true})
    }
      
  }}

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
