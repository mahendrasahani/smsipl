import React, { useEffect, useState } from "react";
import Table from "./reusable/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import Apis from "./../Services/ApiServices/Apis";
import { addItems } from "./store/ItemsSlice";
import moment from "moment/moment";
import { Button, Modal } from 'antd';
import Loading from "./reusable/Loading";
import Header from "./Header";
import Sidebar from "./Sidebar";

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

  const items = useSelector((state) => state.Items.items);

  const dispatch = useDispatch();

  const style1 = {
    margin: "90px auto",
    width: "90%",
  };

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
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  //-------------------------------------------Reset Data----------------------------------------------------------//

  const ResetData = () => {
    setstartDate(maindate);
    setendDate(maindate);
    setStatus(0);
  };



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
                    <a href="home.html">Home</a>
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
                      <label>Select date range</label>

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
                      <label>MRN number</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="mr-nno"
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <label>Vessel visit code</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="mr-nno"
                      />
                    </div>
                  </div>
                  <div className="col-md-2" id="todate-div">
                    <div className="form-group">
                      <label>BoL number</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="mr-nno"
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <label>Carrier name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="mr-nno"
                      />
                    </div>
                  </div>
                  <div className="col-md-2 mt-4 pt-2">
                    <button
                      type="button"
                      className="btn btn-block btn-sm btn-outline-danger"
                    >
                      Clear all
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
                        <th style={{ color: "#3166C9" }}>MRN no.</th>
                        <th style={{ color: "#3166C9" }}>Vessel visit code</th>
                        <th style={{ color: "#3166C9" }}>Cargo code</th>
                        <th style={{ color: "#3166C9" }}>BoL count.</th>
                        <th style={{ color: "#3166C9" }}>Status</th>
                        <th style={{ color: "#3166C9" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "12px" }}>
                      {items &&
                        items?.map((itm) => {
                          return (
                            <tr>
                              <td>{itm?.id}</td>
                              <td>
                                {moment(itm?.row_created.slice(0, 10)).format(
                                  "DD-MM-YYYY"
                                )}
                              </td>
                              <td>{JSON.parse(itm?.message)?.vessel?.mrn}</td>
                              <td>
                                {
                                  JSON.parse(itm?.message).vessel
                                    ?.vesselVisitCode
                                }
                              </td>

                              <td>c</td>
                              <td>03</td>
                              <td style={{ color: "#FF0000" }}>
                                {itm?.status_desc}
                              </td>
                              <td
                                style={{ gap: "2px", display: "flex" }}
                                className="actions"
                              >
                                <a
                                  className="btn btn-sm btn-primary btn-clear"
                                  href={`/messageDetails/${itm?.id}`}
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                                <a className="btn btn-sm  btn-clear">
                                  <i className="fa fa-refresh"></i>
                                </a>

                                <a
                                  className="btn btn-sm btn-clear"
                                  data-toggle="modal"
                                  data-target="#code"
                                  
                                >
                                  <i className="fa fa-code"></i>
                                </a>
                                          
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
        </section>
      </div>
      <aside className="control-sidebar control-sidebar-dark"></aside>
    </div>
    <div className="modal fade" id="code" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Messages Information</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          ...
        </div>
      </div>
    </div>
  </div>
  </>
  );
};

export default Messages;
