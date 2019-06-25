import $ from 'jquery'
import _ from 'lodash'
import axios from 'axios'
//import {Redirect} from 'react-router-dom';

 class UserService{
     

    getUserInfo(id, callback){
        axios.get(`http://localhost:8012/api/users/getUser/${id}`)
        .then(res => {
         callback(res)
        }) .catch(error => {
            console.log(error);
          });

    }

 update(id,formData, callback) {

    axios.put(`http://localhost:8012/api/users/updateUser/${id}`, formData)
    .then(res => {
     callback(res)
    }) .catch(error => {
        console.log(error);
      });
 }


 

}
export default new UserService();