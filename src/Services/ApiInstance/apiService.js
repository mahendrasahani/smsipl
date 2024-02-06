
import axios from 'axios'


class ApiService {


  async post(url, data) {                                                                            //login post request

    return new Promise(async function (resolve, reject) {
      await axios({
        method: "post",
        mode: "cors",
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
          window.location.href = '/login'
          
          });
        
    });
  }
 

  async MessageDetails(url,id) {
    const token = localStorage.getItem('token')
    return new Promise(async function (resolve, reject) {
      await axios({
        method: "post",
        mode: "cors",
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
        alert("Can't find the message Details for required messageId")
        window.location.href="/admin/dashboard"
        console.log("error: " + err);
      });
    });
  }


  async MessageList(url,start,end,status) {

    const token = localStorage.getItem('token')
  
    return new Promise(async function (resolve, reject) {
      await axios({
        method: "get",
          mode: "cors",
        params:{
          dtStartDate:start,
          dtEnddate:end,
          nStatus:status,
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
        mode: "cors",
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
              alert("Error in processing the message Details")
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
        mode: "cors",
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
