import React, { useEffect, useState } from "react";
import Apis from "./../Services/ApiServices/Apis";
import { useApiUrl } from "./Context/ApiUrlContext";
import { toast } from "react-toastify";

const Login = () => {
  const { apiUrl, setApiUrl } = useApiUrl();
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

 const token = sessionStorage.getItem("token") || 0;

 useEffect(() => {
    if (token) {
      window.location.href = "/dashboard";
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const usernameRegex = /^[a-zA-Z0-9_]{1,30}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;
  

    if (!usernameRegex.test(formdata?.username)) {
      toast.error('Username must be alphanumeric and less than or equal to 30 characters');
      return;
    }
  
    if (!passwordRegex.test(formdata?.password)) {
      toast.error('Password must be at least 6 characters long and contain at least one digit, one lowercase and one uppercase letter');
      return;
    }
  

    var apiResponseData = await Apis.IntAuthentication(apiUrl, formdata);
    sessionStorage.setItem("token", apiResponseData.token);
    window.location.href = "/dashboard";
  };

  const handleFormdata = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  return (
    <div className="row" style={{ overflowX: "hidden" }}>
      <div className="col-md-6 hold-transition login-page logo-div">
        <div className="login-box" align="center">
          <img src="img/logologin.png" className="img-fluid" width="120px" alt="img"/>
        </div>
      </div>
      <div className="col-md-6 hold-transition login-page login-div">
        <div className="login-box">
          <img
            src="img/logologin1.png"
            className="img-fluid logologin"
            width="120px"
            alt="IMG"
          />
          <h2 className="font-weight-bold text-white">DP World DAR Portal</h2>
          <h5 className="text-white mb-5" style={{ color: "#e4e4e4" }}>
            Welcome Back, Please login to continue
          </h5>
          <form
            method="post"
            action="/dashboard"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control input-logo email"
                placeholder="Username"
                name="username"
                value={formdata.username}
                onChange={(e) => handleFormdata(e)}
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control input-logo password"
                placeholder="Password"
                name="password"
                value={formdata.password}
                onChange={(e) => handleFormdata(e)}
              />
            </div>
            <div className="row">
              <div className="col-12">
                <button
                  className="btn btn-primary btn-block login-btn"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
