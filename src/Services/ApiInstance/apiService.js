import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios'


class ApiService {


  async post(url, data) {                                                                            //login post request

    return new Promise(async function (resolve, reject) {
      await axios({
        method: "post",
        url,
        data,
        headers:
        {
          'Accept': "*/*",
          "Content-Type": "application/json",
        }
      }).then((result) => {
        resolve(result);
      })
        .catch((err) => {
          console.log("error: " + err);
          alert("Error in POST update/Wrong Crendentials")
          window.location.href = '/'
          
          });
        
    });
  }
 

  async MessageDetails(url,id) {
    const token = localStorage.getItem('token')
    return new Promise(async function (resolve, reject) {
      await axios({
        method: "post",
        url,
        params: {
          messageId:id,
          nIDType:1,
        },
        headers:
        {
          'Authorization':`bearer ${token}`,
          'Accept': "*/*",
        }
        
      
    }).then((result) => {
      resolve(result);
    })
      .catch((err) => {
        console.log("error: " + err);
      });
    });
  }


  async MessageList(url,start,end) {

    const token = localStorage.getItem('token')
  
    return new Promise(async function (resolve, reject) {
      await axios({
        method: "get",
        params:{
          dtStartDate:start,
          dtEnddate:end,
          nStatus:0,
        },
        url,
        headers:
        {
          'Authorization':`bearer ${token}`,
          'Accept': "*/*",
        }
      }).then((result) => {
        resolve(result);
      })
        .catch((err) => {
          console.log("error: " + err);
        });
    });
  }

  async processMessage(url,id,scode) {
    const token = localStorage.getItem('token')
    return new Promise(async function (resolve, reject) {
      await axios({
        method: "post",
        url,
        body:{
          messageId:id,
          nIDType:1,
          nStatusCode:scode,
        },
        headers:
        {
          'Authorization':`bearer ${token}`,
          'Accept': "multipart/form-data",
          "Content-Type": "multipart/form-data",
        }
      }).then((result) => {
        resolve(result);
      })
        .catch((err) => {
          console.log("error: " + err);
          if (err === 'Error: Request failed with status code 403' || err === 'Error: Request failed with status code 401') {
            alert("Login to continue!!")
            window.location.href = '/login'
          } else {
            console.log(err)
            if (err && err.response && err.response.data && err.response.data.message) {
              alert(err.response.data.message);
            } else {
              alert("Error in POST update")
            }
          }
        });
    });
  }

  async manifest(url,data) {
    const token = localStorage.getItem('token')
    return new Promise(async function (resolve, reject) {
      await axios({
        method: "post",
        url,
        body:data,
        headers:
        {
          'Authorization':`bearer ${token}`,
          'Accept': "*/*",
          "Content-Type": "application/json",
        }
      }).then((result) => {
        resolve(result);
      })
        .catch((err) => {
          console.log("error: " + err);
          if (err === 'Error: Request failed with status code 403' || err === 'Error: Request failed with status code 401') {
            alert("Login to continue!!")
            window.location.href = '/login'
          } else {
            console.log(err)
            if (err && err.response && err.response.data && err.response.data.message) {
              alert(err.response.data.message);
            } else {
              alert("Error in POST update")
            }
          }
        });
    });
  }



};



export default new ApiService();
