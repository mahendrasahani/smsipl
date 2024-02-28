import React, { useEffect, useRef, useState } from "react";
import ExportExcel from "./Excelexport";
import { useSelector, useDispatch } from "react-redux";
import Apis from "../Services/ApiServices/Apis";
import { addItems } from "./store/ItemsSlice";
import GraphCard from "./GraphCard";

const Dashboard = () => {
  const hidden = useSelector((state) => state.hiddenstate.hidden);
  const items = useSelector((state) => state.Items.items);
  const [hiddenSidebar,setHiddenSidebar]=useState(false)
  const [url,setUrl]=useState("")
  const onRef = useRef();
  const betweenRef = useRef();

  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [statusValue, setStatusValue] = useState(0);
  const [dateOption, setDateOption] = useState(2);
  const [number, setNumber] = useState(0); // Define setNumber state
  const [logbtn,setLogbtn]=useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const start = formatDate(startDate);
      const end = formatDate(endDate);
      fetchMessage(start, end);
    } else {
      window.location.href = "/";
    }
  }, [startDate, endDate, statusValue, dateOption]);

  const fetchMessage = async (start, end) => {
    try {
      const apiResponse = await Apis.GetMessageList(
        "https://dpw1.afrilogitech.com/api",
        start,
        end,
        statusValue
      );
      dispatch(addItems(apiResponse?.data));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };



  useEffect(() => {
    const element1 = onRef.current;
    const element2 = betweenRef.current;
    element2.checked = true;

    const checkedStatus = () => {
      element1.checked = true;
      element2.checked = false;
    };

    element1.addEventListener("click", checkedStatus);

    const checkedStatus2 = () => {
      element1.checked = false;
      element2.checked = true;
    };

    element2.addEventListener("click", checkedStatus2);

    return () => {
      element1.removeEventListener("click", checkedStatus);
      element2.removeEventListener("click", checkedStatus2);
    };
  }, []);

  useEffect(()=>{
    const pageURLArray = window.location.href.split("/")
    setUrl(pageURLArray[pageURLArray.length - 1])
    console.log("URL",url)
  })

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
    <div className="wrapper">
      {/* <div className="preloader flex-column justify-content-center align-items-center">
      <img src="img/logo.png" alt="Logo" className="img-fluid" />
    </div> */}

<nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{marginLeft:hiddenSidebar&&"0"}} >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              onClick={()=>setHiddenSidebar(!hiddenSidebar)}
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

      
      <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{background:"white",width:"255px",transform:hiddenSidebar?"translateX(-255px)":"translateX(0px)"}}>
        <a href="index.html" className="brand-link"  style={{paddingBottom:"0px"}}>
          <img
            src="img/logo.png"
            alt="Logo"
            className="img-fluid"
            width="180px"
          />
        </a>
       
          <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <a href="/dashboard" className={`nav-link ${url == "dashboard" ? "active" : ""}`}>
                  <img src="img/home.png" className="img-responsive" />
                  <p>Dashboard</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/messages" className={`nav-link ${url == "messages" ? "active" : ""}`}>
                  <img src="img/msg.png" className="img-responsive" />
                  <p>Messages</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/users" className={`nav-link ${url == "users" ? "active" : ""}`}>
                  <img src="img/manage.png" className="img-responsive" />
                  <p>Users</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>

    
       
      </aside>
    

      <div className="content-wrapper" style={{marginLeft:hiddenSidebar&&"0"}}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12">
                <h1
                  className="m-0"
                  style={{ color: "#1B106D", fontWeight: "bold" }}
                >
                  Welcome To Dashboard
                </h1>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Admin Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-5">
                    <div className="row mb-3">
                      <div className="col-md-4 col-4">
                        <label>Search Results </label>
                      </div>
                      <div className="col-md-2 col-3">
                        <div className="custom-control custom-radio">
                          <input
                            className="custom-control-input"
                            type="radio"
                            id="on"
                            name="customRadio"
                            ref={onRef}
                            value={1}
                            onClick={(e) => setDateOption(e.target.value)}
                          />
                          <label for="on" className="custom-control-label">
                            On
                          </label>
                        </div>
                      </div>
                      <div className="col-md-3 col-3">
                        <div className="custom-control custom-radio">
                          <input
                            className="custom-control-input"
                            type="radio"
                            id="between"
                            value={2}
                            ref={betweenRef}
                            onClick={(e) => setDateOption(e.target.value)}
                            name="customRadio"
                          />
                          <label for="between" className="custom-control-label">
                            Between
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                     
                          {dateOption === "1" ? (
                           
                           <div className="col-md-6">
                           <div className="form-group">
                             <label>From date</label>
                             <div
                          class="input-group date"
                          id="reservationdate"
                          data-target-input="nearest"
                        >
                               <input
                                 type="date"
                                 class="form-control form-control-sm datetimepicker-input"
                                 id="from-date"
                                 value={startDate}
                                 min="2023-01-01"
                                 max={new Date().toISOString().split("T")[0]}
                                 onChange={(e) => setStartDate(e.target.value)}
                                 data-target="#reservationdate"
                               />
                               </div>
                               </div>
                               </div>
                      
                          ) : (
                            <>
                               <div className="col-md-6">
                           <div className="form-group">
                                <label for="start">From Date</label>
                                <div
                          class="input-group date"
                          id="reservationdate"
                          data-target-input="nearest"
                        >
                                <input
                                id="start"
                                  type="date"
                                  value={startDate}
                                  min="2023-01-01"
                                  max={new Date().toISOString().split("T")[0]}
                                  onChange={(e) => setStartDate(e.target.value)}
                                />
                                </div>
                              </div>
                              </div>
                              <div className="col-md-6">
                           <div className="form-group">
                                <label for="to">To Date</label>
                                <div
                          class="input-group date"
                          id="reservationdate"
                          data-target-input="nearest"
                        >
                                <input
                                id="to"
                                  type="date"
                                  min="2023-01-01"
                                  max={new Date().toISOString().split("T")[0]}
                                  value={endDate}
                                  onChange={(e) => setEndDate(e.target.value)}
                                />
                                </div>
                              </div>
                              </div>
                            </>
                          )}
                        </div>
                        <div class="col-md-6">
                        <div className="form-group">
                          <label>Status</label>
                          <select
                name="SelectStatus"
                className="form-control"
                id="select1"
                value={statusValue}
                onChange={(e) => setStatusValue(e.target.value)}
              >
                <option value={0}>Select All</option>
                <option value={4}>Details Inserted</option>
                <option value={6}>Transfer Successful</option>
                <option value={5}>Details Insertion Failed</option>
                <option value={7}>Transfer Failed</option>
              </select>
                        </div>
                        </div>
                  
                     
                    <div className="row mt-3 mb-2">
                      <div className="col-md-3 col-5">
                        <button
                          type="button"
                          className="btn btn-block btn-outline-danger"
                        >
                          Clear all
                        </button>
                      </div>
                     
                      <ExportExcel excelData={items} fileName={"Excel Export"} />
                      
                    </div>
                  </div>
                  <div className="col-md-1"></div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                      <GraphCard  itemsData={items}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <aside className="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
};

export default Dashboard;
