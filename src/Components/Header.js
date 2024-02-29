import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHidden } from './store/HiddenSlice';

const Header = () => {

    const [logbtn,setLogbtn]=useState(false)
    const hidden = useSelector((state) => state.hiddenstate.hidden);
    const dispatch = useDispatch();

    const handletoken=()=>{
   
        localStorage.removeItem("token");
        window.location.href = "/";
      
    }
  
    const dropdownRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setLogbtn(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  return (
   
<nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{marginLeft:hidden&&"0"}} >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              onClick={()=>dispatch(setHidden(!hidden))}
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
                onClick={()=>setLogbtn(!logbtn)}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className="nav-link dropdown-toggle"
                style={{ color: "#6159C7",cursor:"pointer" }}
              >
                <img src="img/user1.png" className="img-responsive" />
                DP WORLD
              </a>
              <div ref={dropdownRef}>
              {
                logbtn &&
                <span
              
                style={{ right: "10px",position:"absolute",width:"103px",background:"white",cursor:"pointer",paddingTop:"10px"}}
              >
               
                  <a  className="dropdown-item" onClick={()=>handletoken()}>
                    Logout
                  </a>
               
              </span>
              }
              </div>
             
             
            </li>
          </ul>
        </ul>
      </nav>
  );
}

export default Header;
