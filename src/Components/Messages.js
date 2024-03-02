import React, { useEffect, useRef, useState } from "react";
import Table from "./reusable/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import Apis from "./../Services/ApiServices/Apis";
import { addItems } from "./store/ItemsSlice";
import moment from "moment/moment";
import { Button, Modal } from "antd";
import Loading from "./reusable/Loading";
import { FaCode, FaRegEye } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router";

const Messages = () => {
  //present date
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const maindate = `${year}-${month}-${day}`;

  const [statusvalue, setStatus] = useState(0);
  const [startdate, setstartDate] = useState(maindate);
  const [enddate, setendDate] = useState(maindate);
  const hidden = useSelector((state) => state.hiddenstate.hidden);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateOption, setDateoption] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mrnnumber, setmrnnumber] = useState("");
  const [visitcode, setVisitcode] = useState("");
  const [bolno, setbolno] = useState("");
  const [carriername, setcarriername] = useState("");
  const [items, setitems] = useState([]);
  const [modaldata, setmodaldata] = useState([]);

  // const items = useSelector((state) => state.Items.items);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "DP WORLD | Dashboard";
  }, []);

  const formatDate2 = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
    return formattedDate;
  };

  useEffect(() => {
    const start = formatDate2(startdate);

    const end = formatDate2(enddate);
    if (dateOption == 1) {
      fetchMessage(start, start, statusvalue);
    } else {
      fetchMessage(start, end, statusvalue);
    }
  }, [startdate, enddate, statusvalue]);

  // --------------------------------Fetching data from getMessageList Api--------------------------------------//

  const fetchMessage = async (start, end) => {
    try {
      setLoading(true);
      const apiResponse = await Apis.GetMessageList(
        "https://dpw1.afrilogitech.com/api",
        start,
        end,
        statusvalue
      );

      dispatch(addItems(apiResponse?.data));
      setitems(apiResponse?.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  //-------------------------------------------Reset Data----------------------------------------------------------//

  const ResetData = () => {
    setbolno("");
    setVisitcode("");
    setcarriername("");
    setmrnnumber("");
  };

  const handleFilterMEssage = () => {
    let filteredData = items;
    if (mrnnumber !== "") {
      filteredData = filteredData.filter(
        (itm) => itm.manifest.vessel.mrn === mrnnumber
      );
    }

    if (visitcode !== "") {
      filteredData = filteredData.filter((itm) =>
        itm.manifest.vessel.vesselVisitCode
          .toLowerCase()
          .includes(visitcode.toLowerCase())
      );
    }

    if (carriername !== "") {
      filteredData = filteredData.filter((itm) =>
        itm.manifest.vessel.carrierName
          .toLowerCase()
          .includes(carriername.toLowerCase())
      );
    }

    if (bolno !== "") {
      filteredData = filteredData.filter((itm) =>
        itm.manifest.bolList.some((itm1) =>
          itm1.bolNbr.toLowerCase().includes(bolno.toLowerCase())
        )
      );
    }

    setFilteredItems(filteredData);
  };

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleInputChange = (e) => {
    setmrnnumber(e.target.value);
  };

  const handleVisitChange = (e) => {
    setVisitcode(e.target.value);
  };
  const handleBolChange = (e) => {
    setbolno(e.target.value);
  };
  const handleCarrierChange = (e) => {
    setcarriername(e.target.value);
  };

  const handleNavigation = (data) => {
    navigate("/messageDetails", { state: { id: data } });
  };

  const updateModal = (data) => {
    const modaldata1 = filteredItems?.filter((itm) => {
      return itm?.id == data;
    });

    // console.log("mod", modaldata1);
    setmodaldata(modaldata1);
    setIsModalOpen(!isModalOpen);
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const jsonString = JSON.stringify(modaldata, null, 2);

  // State to store the formatted JSON string
  const [formattedJson, setFormattedJson] = useState("");

  useEffect(() => {
    // Replace newline characters with HTML line breaks
    const htmlFormattedJson = jsonString.replace(/\n/g, "<br>");
    setFormattedJson(htmlFormattedJson);
  }, [jsonString]);

  return (
    <>
      <div className="wrapper">
        <Header />

        <Sidebar />

        <div className="content-wrapper" style={{ marginLeft: hidden && "0" }}>
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12">
                  <h1
                    className="m-0"
                    style={{ color: "#1B106D", fontWeight: "bold" }}
                  >
                    Messages
                  </h1>
                  <ol className="breadcrumb ">
                    <li className="breadcrumb-item">
                      <a href="/home">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Messages</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <section className="content">
            <div className="container-fluid">
              <div className="card">
                <div className="card-body">
                  <h5>Search Results </h5>
                  <div className="row mt-3">
                    <div className="col-md-2">
                      <div className="form-group">
                        <label>Select Date Range</label>

                        <select
                          name="SelectStatus"
                          className="form-control form-control-sm"
                          id="select"
                          value={dateOption}
                          onChange={(e) => setDateoption(e.target.value)}
                        >
                          <option value={0}>Select Range</option>
                          <option value={1}>On</option>
                          <option value={2}>Between</option>
                        </select>
                      </div>
                    </div>
                    {dateOption === "1" ? (
                      <div class="col-md-2">
                        <div class="form-group">
                          <label>From Date</label>
                          <div
                            class="input-group date"
                            id="reservationdate"
                            data-target-input="nearest"
                          >
                            <input
                              type="date"
                              class="form-control form-control-sm datetimepicker-input"
                              id="from-date"
                              value={startdate}
                              min="2023-01-01"
                              max={new Date().toISOString().split("T")[0]}
                              onChange={(e) => setstartDate(e.target.value)}
                              data-target="#reservationdate"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div class="col-md-2">
                          <div class="form-group">
                            <label>From Date</label>
                            <div
                              class="input-group date"
                              id="reservationdate"
                              data-target-input="nearest"
                            >
                              <input
                                type="date"
                                class="form-control form-control-sm datetimepicker-input"
                                id="from-date"
                                value={startdate}
                                min="2023-01-01"
                                max={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setstartDate(e.target.value)}
                                data-target="#reservationdate"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-2">
                          <div class="form-group">
                            <label>From Date</label>
                            <div
                              class="input-group date"
                              id="reservationdate"
                              data-target-input="nearest"
                            >
                              <input
                                type="date"
                                class="form-control form-control-sm datetimepicker-input"
                                id="from-date"
                                min="2023-01-01"
                                max={new Date().toISOString().split("T")[0]}
                                value={enddate}
                                onChange={(e) => setendDate(e.target.value)}
                                data-target="#reservationdate"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>Status</label>
                        <select
                          name="SelectStatus"
                          className="form-control form-control-sm"
                          id="select1"
                          value={statusvalue}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value={0}>Select All</option>
                          <option value={4}>Details Inserted</option>
                          <option value={6}>Transfer Successful</option>
                          <option value={5}>Details Insertion Failed</option>
                          <option value={7}>Transfer Failed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <hr />
                  <div className="row mt-3">
                    <div className="col-md-2">
                      <div className="form-group">
                        <label>MRN Number</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="mr-nno"
                          value={mrnnumber}
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group">
                        <label>Vessel Visit Code</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="mr-nno"
                          value={visitcode}
                          onChange={(e) => handleVisitChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-md-2" id="todate-div">
                      <div className="form-group">
                        <label>BoL Number</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="mr-nno"
                          value={bolno}
                          onChange={(e) => handleBolChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group">
                        <label>Carrier Name</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="mr-nno"
                          value={carriername}
                          onChange={(e) => handleCarrierChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-md-2 mt-4 pt-2">
                      <button
                        type="button"
                        className="btn btn-block btn-sm btn-outline-primary"
                        onClick={() => handleFilterMEssage()}
                      >
                        Search
                      </button>
                    </div>
                    <div className="col-md-2 mt-4 pt-2">
                      <button
                        type="button"
                        className="btn btn-block btn-sm btn-outline-danger"
                        onClick={() => ResetData()}
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="col-md-12 pt-3 table-responsive">
                    <table className="table table-striped table-sm table-hover text-nowrap">
                      <thead>
                        <tr style={{ background: "#E1E8FF", fontSize: "12px" }}>
                          <th style={{ color: "#3166C9" }}>#</th>
                          <th style={{ color: "#3166C9" }}>Date</th>
                          <th style={{ color: "#3166C9" }}>MRN No.</th>
                          <th style={{ color: "#3166C9" }}>
                            Vessel Visit Code
                          </th>
                          {/* <th style={{ color: "#3166C9" }}>Cargo Code</th> */}
                          <th style={{ color: "#3166C9" }}>BoL Count.</th>
                          <th style={{ color: "#3166C9" }}>Status</th>
                          <th style={{ color: "#3166C9" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody style={{ fontSize: "12px" }}>
                        {filteredItems &&
                          filteredItems?.map((itm) => {
                            return (
                              <tr>
                                <td>{itm?.id}</td>
                                <td>
                                  {moment(itm?.row_created.slice(0, 10)).format(
                                    "DD-MM-YYYY"
                                  )}
                                </td>
                                <td>{itm?.manifest?.vessel?.mrn}</td>
                                <td>{itm?.manifest.vessel?.vesselVisitCode}</td>

                                {/* <td>
                                  {itm?.manifest?.bolList?.map((item) => (
                                    <span>{item?.cargoCode}, </span>
                                  ))}
                                </td> */}

                                <td>{itm?.manifest?.bolList?.length}</td>
                                <td
                                  style={{
                                    color:
                                      itm?.status_code === 2 ||
                                      itm?.status_code === 5 ||
                                      itm?.status_code === 7
                                        ? "#FF0000"
                                        : "darkgreen",
                                  }}
                                >
                                  {itm?.status_code === 2 &&
                                    "VALIDATION FAILED"}
                                  {itm?.status_code === 3 &&
                                    "VALIDATION SUCCESSFUL"}
                                  {itm?.status_code === 4 && "DETAILS INSERTED"}
                                  {itm?.status_code === 5 &&
                                    "DETAILS INSERTION FAILED"}
                                  {itm?.status_code === 6 &&
                                    "PUSHING SUCCESSFUL"}
                                  {itm?.status_code === 7 && "PUSHING FAILED"}
                                </td>
                                <td
                                  style={{ gap: "2px", display: "flex" }}
                                  className="actions"
                                >
                                  <button
                                    className="btn btn-sm  btn-clear"
                                    onClick={() => handleNavigation(itm?.id)}
                                  >
                                    <FaRegEye />
                                  </button>
                                  <a className="btn btn-sm bg-success btn-clear">
                                    <FiRefreshCw />
                                  </a>

                                  <button
                                    className="btn btn-sm bg-success  btn-clear"
                                    data-toggle="modal"
                                    data-target="#code"
                                    onClick={() => updateModal(itm?.id)}
                                  >
                                    <FaCode />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {isModalOpen && modaldata && (
              <div className="modal-box" ref={modalRef}>
                <h1
                  style={{ textAlign: "center", textDecoration: "underline" }}
                >
                  Message Information
                </h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<pre>${formattedJson}</pre>`,
                  }}
                />
              </div>
            )}
          </section>
        </div>
        <aside className="control-sidebar control-sidebar-dark"></aside>
      </div>
    </>
  );
};

export default Messages;
