
import axios from 'axios'
import { toast } from "react-toastify";

class ApiService {


  async post(url, data) {
    return new Promise(async function (resolve, reject) {
      await axios({
        method: "post",
        url,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          toast.error("Invalid Credentials")
        });
    });
  }

  async postMessage(url, data) {
    const token = sessionStorage.getItem('token')
    return new Promise(async function (resolve, reject) {
      await axios({
        method: "post",
        url,
        data,
        headers: {
          'Authorization':`bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          toast.error(err)
        });
    });
  }
 

  async MessageDetails(url,id) {
    const token = sessionStorage.getItem('token')
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
        toast.error(`Can't find the message Details for required messageId - ${id}`)
        window.location.href="/messages"
        console.log("error: " + err);
      });
    });
  }


  async MessageList(url,start,end,status) {
    
    const token = sessionStorage.getItem('token')
 return new Promise(async function (resolve, reject) {
      await axios({
        method: "get",
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
    const token = sessionStorage.getItem('token')
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

 

  async bolexcel(url,vid,bolid) {
    const token = sessionStorage.getItem('token')
    return new Promise(async function (resolve, reject) {
      await axios({
        method: "get",
        url,
        params:{
          sVesselVisitCode:vid,
          nBolID:bolid,
        },
    
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
              alert(err)
            }
          }
        });
    });
  }



};



export default new ApiService();
