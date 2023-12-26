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
    axios.defaults.headers.common['Authorization'] = JSON.stringify(token)
    return new Promise(async function (resolve, reject) {
      await axios({
        method: "get",
        url,
        params: {
          messageId:`${id}`
        },
        headers:
        {
          'authorization': token,
          'Accept': "*/*",
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


  async MessageList(url) {
    const token = localStorage.getItem('token')
  
    return new Promise(async function (resolve, reject) {
      await axios({
        method: "get",
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

  async processMessage(url) {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = JSON.stringify(token)
    return new Promise(async function (resolve, reject) {
      await axios({
        method: "get",
        url,
        headers:
        {
          'authorization': token,
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



};



export default new ApiService();
