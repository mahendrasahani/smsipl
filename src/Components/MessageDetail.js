import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import Apis from "../Services/ApiServices/Apis";

const MessageDetail = () => {
  const location = useLocation();
  const id = location?.state?.id;

  const hidden = useSelector((state) => state.hiddenstate.hidden);
  const [bolno, setbolno] = useState("");
  const [cargono, setCargono] = useState("C");
  const [cargolist, setcargoList] = useState([]);
  const [cntrno, setCntrno] = useState("C");
  const [cntrlist, setCntrList] = useState([]);
  const [bolvno, setbolvno] = useState("SKFS026ZZ30");
  const [vlist, setVlist] = useState([]);

  const [message, setMessage] = useState([]);
  const [bollist, setbollist] = useState([]);
  const [errorlist, seterrorlist] = useState([]);
  const [vessel, setVessel] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "DP WORLD | Dashboard";
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    MessageInfo();
  }, []);

  const MessageInfo = async () => {
    try {
      setLoading(true);
      const data = await Apis.getMessageDetails(
        "https://dpw1.afrilogitech.com/api",
        id
      );
      console.log("daya", data?.data);

      setMessage(data?.data?.bollist);
      setVessel(data?.data?.vessel);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtererror = message?.filter((itm) => itm?.errorlist !== null);
    seterrorlist(filtererror);
    console.log("filter", filtererror);
  }, []);

  useEffect(() => {
    const filterbol =
      message && message?.filter((itm) => itm?.bolnbr === bolno);

    setbollist(filterbol);
  }, [bolno, message]);

  useEffect(() => {
    if (bollist && bollist[0]?.bolcargos) {
      const cargonumber = bollist[0]?.bolcargos[0]?.cargotypecode;
      setCargono(cargonumber);
    }

    if (bollist && bollist[0]?.bolcntrs) {
      const cntrnumber = bollist[0]?.bolcntrs[0]?.cntrnbr;
      setCntrno(cntrnumber);
    }

    if (bollist && bollist[0]?.bolvehicles) {
      const vnumber = bollist[0]?.bolvehicles[0]?.casenbr;
      setbolvno(vnumber);
    }
  }, [bollist]);

  useEffect(() => {
    const filtercargo =
      bollist &&
      bollist[0]?.bolcargos?.filter((itm) => itm?.cargotypecode === cargono);
    setcargoList(filtercargo);
  }, [cargono, bollist, message]);

  useEffect(() => {
    const filtercntr =
      bollist && bollist[0]?.bolcntrs?.filter((itm) => itm?.cntrnbr === cntrno);
    setCntrList(filtercntr);
  }, [cntrno, bollist, message]);

  useEffect(() => {
    const filtervno =
      bollist &&
      bollist[0]?.bolvehicles?.filter((itm) => itm?.casenbr === bolvno);
    setVlist(filtervno);
  }, [bolvno, bollist, message]);

  const handlebolno = (e) => {
    setbolno(e.target.value);
  };

  const handleNavigation = (data) => {
    navigate("/modify", { state: { id: data } });
  };

  return (
    <div className="wrapper">
      {/* <div className="preloader flex-column justify-content-center align-items-center">
      <img src="img/logo.png" alt="Logo" className="img-fluid" />
    </div>
   */}

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
                  Message Details
                </h1>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/home">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/messages">Messages</a>
                  </li>
                  <li className="breadcrumb-item active">Transfer failed</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content pb-4">
          <div className="container-fluid">
            <div className="card">
              <div className="card-body">
                <h5>Message Details</h5>
                <div className="row mt-3">
                  <div className="col-md-2 col-6">
                    <p className="mb-0" style={{ fontWeight: "600" }}>
                      MRN No:
                    </p>
                    <p className="mb-0" style={{ fontWeight: "600" }}>
                      Vessels Code:
                    </p>
                    <p className="mb-0" style={{ fontWeight: "600" }}>
                      Cargo Code:
                    </p>
                    <p className="mb-0" style={{ fontWeight: "600" }}>
                      Bol Count:
                    </p>
                  </div>
                  {vessel && (
                    <div className="col-md-3 col-6">
                      <p className="mb-0" style={{ color: "#676767" }}>
                        {vessel?.mrn}
                      </p>
                      <p className="mb-0" style={{ color: "#676767" }}>
                        {vessel?.vesselVisitCode}
                      </p>
                      <p className="mb-0" style={{ color: "#676767" }}>
                        C
                      </p>
                      <p className="mb-0" style={{ color: "#676767" }}>
                        {message?.length}
                      </p>
                    </div>
                  )}

                  <div className="col-md-3 col-6" id="todate-div">
                    <p className="mb-0" style={{ fontWeight: "600" }}>
                      Carrier Name:
                    </p>
                    <p className="mb-0" style={{ fontWeight: "600" }}>
                      Departure Port Name:
                    </p>
                    <p className="mb-0" style={{ fontWeight: "600" }}>
                      Cargo Code:
                    </p>
                  </div>
                  <div className="col-md-3 col-6">
                    <p className="mb-0" style={{ color: "#676767" }}>
                      {vessel?.carrierName}
                    </p>
                    <p className="mb-0" style={{ color: "#676767" }}>
                      {vessel?.departurePortName}
                    </p>
                    <p className="mb-0" style={{ color: "#676767" }}>
                      Dar Es salaam
                    </p>
                  </div>
                </div>
                <hr />
                <h5>Failed BoL List</h5>
                <div className="col-md-12 pt-3 table-responsive">
                  <table className="table table-striped table-sm table-hover text-nowrap">
                    <thead>
                      <tr style={{ background: "#E1E8FF", fontSize: "12px" }}>
                        <th style={{ color: "#3166C9" }}>#</th>
                        <th style={{ color: "#3166C9" }}>BoL No.</th>
                        <th style={{ color: "#3166C9" }}>Error</th>
                        <th style={{ color: "#3166C9" }}>Status</th>
                        <th style={{ color: "#3166C9" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "12px" }}>
                      {errorlist?.length > 0 &&
                        errorlist?.map((itm, i) => {
                          return (
                            <tr>
                              <td>{i}</td>
                              <td>{itm?.bolnbr}</td>
                              <td></td>
                              <td style={{ color: "#FF0000" }}>
                                Transfer Failed
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm bg-primary btn-clear"
                                  onClick={() => handleNavigation(id)}
                                >
                                  <i className="fa fa-edit"></i>
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

            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Select BoL No.</label>
                      <select
                        className="form-control form-control-sm"
                        onChange={(e) => setbolno(e.target.value)}
                      >
                        <option value="">Select BoL No.</option>
                        {message &&
                          message?.map((mes) => (
                            <option key={mes?.bolnbr} value={mes?.bolnbr}>
                              {mes?.bolnbr}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Search BoL Number</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="mr-nno"
                        placeholder="Search BoL no."
                        value={bolno}
                        onChange={(e) => handlebolno(e)}
                      />
                    </div>
                  </div>
                </div>
                {bolno && (
                  <>
                    <div className="row mb-4">
                      <div className="col-md-2 col-6">
                        <p className="mb-0" style={{ fontWeight: "600" }}>
                          BoL Number:
                        </p>
                        <p className="mb-0" style={{ fontWeight: "600" }}>
                          Consignee:
                        </p>
                        <p className="mb-0" style={{ fontWeight: "600" }}>
                          Cargo Code:
                        </p>
                        <p className="mb-0" style={{ fontWeight: "600" }}>
                          POD:
                        </p>
                      </div>

                      {bollist && (
                        <div className="col-md-3 col-6">
                          <p className="mb-0" style={{ color: "#676767" }}>
                            {bollist[0]?.bolnbr}
                          </p>
                          <p className="mb-0" style={{ color: "#676767" }}>
                            {bollist[0]?.consignee}
                          </p>
                          <p className="mb-0" style={{ color: "#676767" }}>
                            {bollist[0]?.cargocode}
                          </p>
                          <p className="mb-0" style={{ color: "#676767" }}>
                            {bollist[0]?.pod}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="row">
                      <div className="col-md-4 pr-0">
                        <div className="card" style={{ height: "100%" }}>
                          <div
                            className="card-header"
                            style={{
                              background:
                                "linear-gradient(180deg, #D9D9D9 0%, rgba(217, 217, 217, 0) 100%)",
                            }}
                          >
                            <div className="row">
                              <div className="col-md-9 col-9">
                                <h3 className="card-title">Cargo</h3>
                              </div>
                              <div className="col-md-3 col-3">
                                <select
                                  className="form-control form-control-sm"
                                  onChange={(e) => setCargono(e.target.value)}
                                >
                                  {bollist &&
                                    bollist[0]?.bolcargos.map((itm, i) => {
                                      return (
                                        <option id={itm.cargotypecode}>
                                          {i + 1}
                                        </option>
                                      );
                                    })}
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-6 col-6">
                                <p
                                  className="mb-1"
                                  style={{ fontWeight: "600" }}
                                >
                                  MarAndNbr:
                                </p>
                                <p
                                  className="mb-1"
                                  style={{ fontWeight: "600" }}
                                >
                                  Description:
                                </p>
                                <p
                                  className="mb-1"
                                  style={{ fontWeight: "600" }}
                                >
                                  Qty:
                                </p>
                                <p
                                  className="mb-1"
                                  style={{ fontWeight: "600" }}
                                >
                                  QtyUom:
                                </p>
                                <p
                                  className="mb-1"
                                  style={{ fontWeight: "600" }}
                                >
                                  RefCentrNbr:
                                </p>
                              </div>
                              {cargolist && (
                                <div className="col-md-6 col-6">
                                  <p
                                    className="mb-1"
                                    style={{ color: "#676767" }}
                                  >
                                    {cargolist[0]?.markandnbr}
                                  </p>
                                  <p
                                    className="mb-1"
                                    style={{ color: "#676767" }}
                                  >
                                    {cargolist[0]?.description}
                                  </p>
                                  <p
                                    className="mb-1"
                                    style={{ color: "#676767" }}
                                  >
                                    {cargolist[0]?.qty}
                                  </p>
                                  <p
                                    className="mb-1"
                                    style={{ color: "#676767" }}
                                  >
                                    {cargolist[0]?.qtyuom}
                                  </p>
                                  <p
                                    className="mb-1"
                                    style={{ color: "#676767" }}
                                  >
                                    {cargolist[0]?.refcntrnbr}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 pl-0 pr-0">
                        <div className="card" style={{ height: "100%" }}>
                          <div
                            className="card-header"
                            style={{
                              background:
                                "linear-gradient(180deg, #D9D9D9 0%, rgba(217, 217, 217, 0) 100%)",
                            }}
                          >
                            <div className="row">
                              <div className="col-md-9 col-9">
                                <h3 className="card-title">Container</h3>
                              </div>
                              <div className="col-md-3 col-3">
                                <select
                                  className="form-control form-control-sm"
                                  onChange={(e) => setCntrno(e.target.value)}
                                >
                                  {bollist &&
                                    bollist[0]?.bolcntrs?.map((itm, i) => {
                                      return (
                                        <option id={itm.cntrnbr}>
                                          {i + 1}
                                        </option>
                                      );
                                    })}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            {cntrlist && (
                              <div className="row">
                                <div className="col-md-6 col-6">
                                  <p
                                    className="mb-1"
                                    style={{ fontWeight: "600" }}
                                  >
                                    cntrNbr:
                                  </p>
                                  <p
                                    className="mb-1"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Seal1Nbr:
                                  </p>
                                  <p
                                    className="mb-1"
                                    style={{ fontWeight: "600" }}
                                  >
                                    CntrSize:
                                  </p>
                                </div>

                                <div className="col-md-6 col-6">
                                  <p
                                    className="mb-1"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[0]?.cntrnbr}
                                  </p>
                                  <p
                                    className="mb-1"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[0]?.seal1nbr}
                                  </p>
                                  <p
                                    className="mb-1"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[0]?.cntrsize}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pl-0">
                        <div className="card" style={{ height: "100%" }}>
                          <div
                            className="card-header"
                            style={{
                              background:
                                "linear-gradient(180deg, #D9D9D9 0%, rgba(217, 217, 217, 0) 100%)",
                            }}
                          >
                            <div className="row">
                              <div className="col-md-9 col-9">
                                <h3 className="card-title">Vehicles</h3>
                              </div>
                              <div className="col-md-3 col-3">
                                <select
                                  className="form-control form-control-sm"
                                  onChange={(e) => setbolvno(e.target.value)}
                                >
                                  {bollist &&
                                    bollist[0]?.bolvehicles?.map((itm, i) => {
                                      return (
                                        <option id={itm.casenbr}>
                                          {i + 1}
                                        </option>
                                      );
                                    })}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-6 col-6">
                                <p
                                  className="mb-1"
                                  style={{ fontWeight: "600" }}
                                >
                                  Make:
                                </p>
                                <p
                                  className="mb-1"
                                  style={{ fontWeight: "600" }}
                                >
                                  Model:
                                </p>
                                <p
                                  className="mb-1"
                                  style={{ fontWeight: "600" }}
                                >
                                  CaseNbr:
                                </p>
                                <p
                                  className="mb-1"
                                  style={{ fontWeight: "600" }}
                                >
                                  EngineNbr:
                                </p>
                              </div>
                              {vlist && (
                                <div className="col-md-6 col-6">
                                  <p
                                    className="mb-1"
                                    style={{ color: "#676767" }}
                                  >
                                    {vlist[0]?.make}
                                  </p>
                                  <p
                                    className="mb-1"
                                    style={{ color: "#676767" }}
                                  >
                                    {vlist[0]?.model}
                                  </p>
                                  <p
                                    className="mb-1"
                                    style={{ color: "#676767" }}
                                  >
                                    {vlist[0]?.casenbr}
                                  </p>
                                  <p
                                    className="mb-1"
                                    style={{ color: "#676767" }}
                                  >
                                    {" "}
                                    {vlist[0]?.enginenbr}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* <div className="card">
              <div className="card-body">
                <h5>
                  Status:
                  <span style={{ color: "#991414" }}> Transfer Failed</span>
                </h5>
                <div className="text-muted">Error</div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                tempus, arcu eu pretium consequat, purus orci vulputate
              </div>
            </div> */}
            <div className="row">
              <div className="col-md-2 col-6">
                <button
                  type="button"
                  className="btn btn-block btn-sm text-white"
                  style={{ background: "#A48D6B" }}
                >
                  Clear All &nbsp;<i className="fa fa-refresh"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <aside className="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
};

export default MessageDetail;
