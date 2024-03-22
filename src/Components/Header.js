import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHidden } from "./store/HiddenSlice";
import Apis from "../Services/ApiServices/Apis";

const Header = () => {
  const [logbtn, setLogbtn] = useState(false);
  const hidden = useSelector((state) => state.hiddenstate.hidden);
  const dispatch = useDispatch();
 

  const handletoken = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (!event.target.closest("#dropdownSubMenu1")) {
          setLogbtn(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const sessionDuration = 25 * 60 * 1000; 

  const [sessionTimer, setSessionTimer] = useState(null);

  const startSessionTimer = () => {
    const timer = setTimeout(changeToken, sessionDuration);
    setSessionTimer(timer);
  };

  const changeToken = async () => {
      var apiResponseData = await Apis.IntAuthentication(
        "https://dpw1.afrilogitech.com/api",
        {
          username: "TPA_APIUser",
          password: "AccTKN@2010",
        }
      );
      sessionStorage.setItem("token", apiResponseData.token);
           window.location.reload();
    };

  useEffect(() => {
    startSessionTimer();
   
    return () => {
      clearTimeout(sessionTimer);
    };
  }, []);


  return (
    <nav
      className="main-header navbar navbar-expand navbar-white navbar-light"
      style={{ marginLeft: hidden && "0" }}
    >
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="pushmenu"
            onClick={() => dispatch(setHidden(!hidden))}
            role="button"
          >
            <img src="img/toggle.png" alt="toggle" className="img-fluid" />
          </a>
        </li>
      </ul>
      

      <ul className="navbar-nav ml-auto">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a
              id="dropdownSubMenu1"
              onClick={() => setLogbtn(!logbtn)}
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              className="nav-link dropdown-toggle"
              style={{ color: "#6159C7", cursor: "pointer" }}
            >
              <img src="img/user1.png" className="img-responsive" />
              DP WORLD
            </a>
            <div ref={dropdownRef} className="">
              {logbtn && (
                <span
                  style={{
                    height: "48px",
                    right: "-3px",
                    position: "absolute",
                    width: "153px",
                    background: "white",
                    cursor: "pointer",
                    paddingTop: "10px",
                    borderRadius: "0.25rem",
                  }}
                  className="shadow"
                >
                  <a className="dropdown-item" onClick={() => handletoken()}>
                    Logout
                  </a>
                </span>
              )}
            </div>
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default Header;
