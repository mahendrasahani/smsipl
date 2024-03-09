import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import Apis from "../Services/ApiServices/Apis";
import moment from "moment";
import Loading from "./reusable/Loading";

const MessageDetail = () => {
  const location = useLocation();
  const id = location?.state?.messageData?.id;
  const status_code = location?.state?.messageData?.status_code ;


  const hidden = useSelector((state) => state.hiddenstate.hidden);
  const [bolno, setbolno] = useState("");
  const [cargono, setCargono] = useState(0);
  const [cargolist, setcargoList] = useState([]);
  const [cntrno, setCntrno] = useState(0);
  const [cntrlist, setCntrList] = useState([]);
  const [bolvno, setbolvno] = useState(0);
  const [vlist, setVlist] = useState([]);

  const [message, setMessage] = useState([]);
  const [bollist, setbollist] = useState([]);
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

      
      if(typeof data?.data=== "string"){
        alert("No data found for given message Id");
        window.location.href="/messages"
      }

     
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
    const filterbol =
      message && message?.filter((itm) => itm?.bolnbr === bolno);

    setbollist(filterbol);
  }, [bolno, message]);

  useEffect(()=>{
    setcargoList(bollist[0]?.bolcargos)
  },[bollist])

  useEffect(()=>{
    setCntrList(bollist[0]?.bolcntrs)
  },[bollist])

  useEffect(()=>{
    setVlist(bollist[0]?.bolvehicles)
  },[bollist])



  
  const handlebolno = (e) => {
    setbolno(e.target.value);
  };

  const handleNavigation = (bolno,data) => {
    navigate("/modify", { state: { id: data, bolno:bolno} });
  };

  const handleReprocess = async () => {
    try {
      const data = await Apis.ProcessMessage(
        "https://dpw1.afrilogitech.com/api",
        id,
        status_code
      );

   
      if(data?.success===true){
        alert("Data reprocess successfully")
      }

      else{
        alert("Reprocess failed")
      }

    } catch (error) {
      
      alert("Reprocess failed");
    } 
  };

  const clearMessage=()=>{
     setbolno("")
  }
 

  return (
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
                  Message Details
                </h1>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/messages">Messages</a>
                  </li>
                  <li className="breadcrumb-item active"> {status_code === 1 &&
                                      "Raw Data Received"}
                                    {status_code === 2 &&
                                      "Validation Failed"}
                                    {status_code === 3 &&
                                      "Validation Successful"}
                                    {status_code === 4 &&
                                      "Details Inserted"}
                                    {status_code === 5 &&
                                      "Details Insertion Failed"}
                                    {status_code === 6 &&
                                      "Transfer Successful"}
                                    {status_code === 7 &&
                                      "Transfer Failed"}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content pb-4">
          <div className="container-fluid">
            <div className="card">
              <div className="card-body">
                <h5>Vessel Details</h5>
                {
                  message?.length >0 ?
                  <div className="row mt-3">
                  <div className="col-md-2 col-6">
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                      MRN No:
                    </p>   
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                      Vessel Name:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                      Bol Count:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                      Action Type:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                      Call Sign:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                     Carrier Code:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                      Departure Date:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                    Departure Port Code:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                   Primary Id:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                    Terminal Code:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                    Terminal Name:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                    Tpa Uid:
                    </p>
                  </div>
                  
                    <div className="col-md-3 col-6">
                      <p className="mb-0 height-box" style={{ color: "#676767" }}>
                        {vessel?.mrn}
                      </p>
                      <p className="mb-0 height-box" style={{ color: "#676767" }}>
                        {vessel?.vesselName}
                      </p>
                      <p className="mb-0 height-box" style={{ color: "#676767" }}>
                        {message?.length}
                      </p>
                      <p className="mb-0 height-box" style={{ color: "#676767" }}>
                        {vessel?.actionType}
                      </p>
                      <p className="mb-0 height-box" style={{ color: "#676767" }}>
                        {vessel?.callSign}
                      </p>
                      <p className="mb-0 height-box" style={{ color: "#676767" }}>
                        {vessel?.carrierCode}
                      </p>
                      <p className="mb-0 height-box" style={{ color: "#676767" }}>
                        {vessel?.departureDate}
                      </p>
                      <p className="mb-0 height-box" style={{ color: "#676767" }}>
                        {vessel?.departurePortCode}
                      </p>
                      <p className="mb-0 height-box" style={{ color: "#676767" }}>
                        {vessel?.primaryid}
                      </p>
                      <p className="mb-0 height-box" style={{ color: "#676767" }}>
                        {vessel?.terminalCode}
                      </p>
                      <p className="mb-0 height-box" style={{ color: "#676767" }}>
                        {vessel?.terminalName}
                      </p>
                      <p className="mb-0 height-box" style={{ color: "#676767" }}>
                        {vessel?.tpaUid}
                      </p>
                    </div>
                  

                  <div className="col-md-3 col-6" id="todate-div">
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                      Carrier Name:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                      Departure Port Name:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                      Cargo Code:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                      Approval Data:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                      Discharge Port Code:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                      Discharge Port Name:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                      Expected Arrival Date:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                    InBallastYn:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                    Next Port Of Call:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                   Transport Means Id:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                    Transport Means Nationality:
                    </p>
                    <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                    Voyage Number:
                    </p>
                   
                  </div>
                  <div className="col-md-3 col-6">
                    <p className="mb-0 height-box" style={{ color: "#676767" }}>
                      {vessel?.carrierName}
                    </p>
                    <p className="mb-0 height-box" style={{ color: "#676767" }}>
                      {vessel?.departurePortName}
                    </p>
                    <p className="mb-0 height-box" style={{ color: "#676767" }}>
                      {vessel?.carrierCode}
                    </p>
                    <p className="mb-0 height-box" style={{ color: "#676767" }}>
                      {moment(vessel?.approvalDate).format("mm/dd/yyyy")}
                    </p>
                    <p className="mb-0 height-box" style={{ color: "#676767" }}>
                      {vessel?.dischargePortCode}
                    </p>
                    <p className="mb-0 height-box" style={{ color: "#676767" }}>
                      {vessel?.dischargePortName}
                    </p>
                    <p className="mb-0 height-box" style={{ color: "#676767" }}>
                      {vessel?.expectedArrivalDate}
                    </p>
                    <p className="mb-0 height-box" style={{ color: "#676767" }}>
                      {vessel?.inBallastYn}
                    </p>
                    <p className="mb-0 height-box" style={{ color: "#676767" }}>
                      {vessel?.nextPortOfCall}
                    </p>
                    <p className="mb-0 height-box" style={{ color: "#676767" }}>
                      {vessel?.transportMeansId}
                    </p>

                    <p className="mb-0 height-box" style={{ color: "#676767" }}>
                      {vessel?.transportMeansNationality}
                    </p>

                    <p className="mb-0 height-box" style={{ color: "#676767" }}>
                      {vessel?.voyageNumber}
                    </p>


                  </div>
                </div>
                :
                <Loading/>
                }
               
                <hr />
                {message?.length > 0 && (
                  <>
                    <h5>BoL List</h5>
                    <div className="col-md-12 table-responsive">
                      <table className="table table-striped table-sm table-hover text-nowrap">
                        <thead>
                          <tr
                            style={{ background: "#E1E8FF", fontSize: "12px" }}
                          >
                            <th style={{ color: "#3166C9" }}>#</th>
                            <th style={{ color: "#3166C9" }}>BoL No.</th>
                            {/* <th style={{ color: "#3166C9" }}>Error</th> */}
                            <th style={{ color: "#3166C9" }}>Status</th>
                            <th style={{ color: "#3166C9" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody style={{ fontSize: "12px" }}>
                          {message?.length > 0 &&
                            message?.map((itm, i) => {
                              return (
                                <tr key={itm?.bolnbr}>
                                  <td>{i}</td>
                                  <td>{itm?.bolnbr}</td>
                                  <td
                                    style={{
                                      color:
                                        itm?.errorlist?.length > 0 || itm?.pushstatus==7
                                          ? "#FF0000"
                                          : "darkgreen",
                                    }}
                                  >
                                    {itm?.errorlist?.length > 0 || itm?.pushstatus==7
                                      ? "Transfer Failed"
                                      : "Successful"}
                                  </td>
                                  <td>
                                    {itm?.errorlist?.length > 0 || itm?.pushstatus==7 ? (
                                      <button
                                        className="btn btn-sm bg-primary btn-clear"
                                        onClick={() => handleNavigation(itm.bolnbr,id)}
                                      >
                                        <i className="fa fa-edit"></i>
                                      </button>
                                    ) : (
                                      <p style={{ color: "darkgreen" }}>
                                        -
                                      </p>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
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
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          BoL Number:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Primary Id:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Trade Mode:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Consignee:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Cargo Code:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          POD:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Shipper:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Notifier:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Org:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Pol:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Dst:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        Consignee Address:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        Consignee Name:

                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        Consignee Tel:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        Notify Address:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        Notify Name:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        Notify Tel:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        Exporter Address:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        Exporter Name:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Name 0:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Name 1:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Name 2:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Name 3:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Name 4:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Name 5:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Name 6:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Name 7:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Name 8:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Name 9:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Nbr 0:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Nbr 1:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Nbr 2:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Nbr 3:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Nbr 4:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Nbr 5:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Nbr 6:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Nbr 7:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Nbr 8:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                       User Defined Nbr 9:
                        </p>




                      </div>
                      {bollist && (
                        <div className="col-md-3 col-6">
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.bolnbr}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.primaryid}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.trademode}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.consignee}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.cargocode}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.pod}
                          </p>

                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.shipper}
                          </p>

                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.notifier}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.org}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.pol}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.dst}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.consigneeaddress}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.consigneename}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.consigneetel}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.notifyaddress}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.notifyname}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.notifytel}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.exporteraddress}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.exportername}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinedname0}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinedname1}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinedname2}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinedname3}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinedname4}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinedname5}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinedname6}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinedname7}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinedname8}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinedname9}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinednbr0}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinednbr1}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinednbr2}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinednbr3}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinednbr4}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinednbr5}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinednbr6}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinednbr7}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinednbr8}
                          </p>
                          <p className="mb-0 height-box" style={{ color: "#676767" }}>
                            {bollist[0]?.userdefinednbr9}
                          </p>
                        </div>
                      )}
                      <div className="col-md-3 col-6" id="todate-div">
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Place Of Delivery:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Crn:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Bl Type:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Loading Port Code:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Loading Port Name:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Destination Place Code:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Destination Place Name:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Delivery Place Code:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Delivery Place Name:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Cargo Classification Code:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        Cargo Classification Name:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        Shipping Agent Code:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        Shipping Agent Name:

                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        Forwarder Code:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        Forwarder Name:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        Forwarder Tel:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                          Exporter Tel:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        Exporter Til:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Code 0:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Code 1:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Code 2:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Code 3:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Code 4:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Code 5:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Code 6:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Code 7:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Code 8:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Code 9:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Time 0:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Time 1:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Time 2:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Time 3:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Time 4:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Time 5:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Time 6:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Time 7:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Time 8:
                        </p>
                        <p className="mb-0 height-box" style={{ fontWeight: "600" }}>
                        User Defined Time 9:
                        </p>
                      </div>
                      <div className="col-md-3 col-6">
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.placeofdelivery}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.crn}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.bltype}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.loadingportcode}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.loadingportname}
                        </p>

                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.destinationplacecode}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.destinationplacename}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.deliveryplacecode}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.deliveryplacename}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.cargoclassificationcode}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.cargoclassificationname}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.shippingagentcode}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.shippingagentname}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.forwardercode}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.forwardername}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.forwardertel}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.exportertel}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.exportertin}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedcode0}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedcode1}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedcode2}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedcode3}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedcode4}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedcode5}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedcode6}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedcode7}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedcode8}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedcode9}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedtime0}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedtime1}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedtime2}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedtime3}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedtime4}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedtime5}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedtime6}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedtime7}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedtime8}
                        </p>
                        <p className="mb-0 height-box" style={{ color: "#676767" }}>
                          {bollist[0]?.userdefinedtime9}
                        </p>

                      </div>
                    </div>
                    <div className="row">
                     {
                       cargolist!==null &&
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
                                   bollist[0]?.bolcargos?.map((itm, i) => {
                                     return (
                                       <option id={i} key={i} value={i}>
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
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 MarAndNbr:
                               </p>
                               <p
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 Cargo Type Code:
                               </p>

                               <p
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 Description:
                               </p>
                               <p
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 Commodity Code:
                               </p>
                               <p
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 Hs Code:
                               </p>
                               <p
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 Volume In CBM:
                               </p>
                               <p
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 Volume:
                               </p>
                               <p
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 Volume Uom:
                               </p>
                               <p
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 Weight(Kg):
                               </p>
                               <p
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 Weight:
                               </p>
                               <p
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 Weight Uom:
                               </p>
                               <p
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 Qty:
                               </p>
                               <p
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 QtyUom:
                               </p>
                               <p
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 RefCentrNbr:
                               </p>
                               <p
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 Remarks:
                               </p>
                             </div>
                               <div className="col-md-6 col-6">
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {cargolist[cargono]?.markandnbr}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {cargolist[cargono]?.cargotypecode}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {cargolist[cargono]?.description}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {cargolist[cargono]?.commoditycode}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {cargolist[cargono]?.hscode}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {cargolist[cargono]?.volumeincbm}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {cargolist[cargono]?.volume}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {cargolist[cargono]?.volumeuom}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {cargolist[cargono]?.weightinkg}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {cargolist[cargono]?.weight}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {cargolist[cargono]?.weightuom}
                                 </p>

                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {cargolist[cargono]?.qty}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {cargolist[cargono]?.qtyuom}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {cargolist[cargono]?.refcntrnbr}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {cargolist[cargono]?.remarks}
                                 </p>
                               </div>
                             
                           </div>
                         </div>
                       </div>
                     </div>
                     }

                     {
                        cntrlist!==null &&
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
                                        <option id={i} key={i} value={i}>
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
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Cntr Nbr:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Seal1Nbr:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Seal2Nbr:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Seal3Nbr:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    CntrSize:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    CntrBoxOper:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Imdg1:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Imdg2:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Imdg3:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Imdg4:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Gross Weight In Kg:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Frieght Indicator:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Container Package:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Package Unit:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Container Weight:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Container Weight(U):
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Container Volume:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Container Volume(U):
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Refer Plug:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Min temp:
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ fontWeight: "600" }}
                                  >
                                    Max Temp:
                                  </p>
                                </div>

                                <div className="col-md-6 col-6">
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.cntrnbr}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.seal1nbr}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.seal2nbr}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.seal3nbr}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.cntrsize}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.cntrboxoper}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.imdg1}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.imdg2}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.imdg3}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.imdg4}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.grossweightinkg}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.freightindicator}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.containerpackage}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.packageunit}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.containerweight}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.containerweightunit}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.containervolume}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.containervolumeunit}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.referplugyn}
                                  </p>
                                
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.mintemp}
                                  </p>
                                  <p
                                    className="mb-1 height-box"
                                    style={{ color: "#676767" }}
                                  >
                                    {cntrlist[cntrno]?.maxtemp}
                                  </p>
                                </div>
                              </div>
                            
                          </div>
                        </div>
                      </div>
                     }

                    {
                       vlist && 
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
                                       <option value={i} key={i}>
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
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 Make:
                               </p>
                               <p
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 Model:
                               </p>
                               <p
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 CaseNbr:
                               </p>
                               <p
                                 className="mb-1 height-box"
                                 style={{ fontWeight: "600" }}
                               >
                                 EngineNbr:
                               </p>
                              
                                 <p className="mb-1 height-box" style={{ fontWeight: "600" }}>
                             Height:
                           </p>
                           <p className="mb-1 height-box" style={{ fontWeight: "600" }}>
                             KeyNbr:
                           </p>
                           <p className="mb-1 height-box" style={{ fontWeight: "600" }}>
                             Length:
                           </p>

                           <p className="mb-1 height-box" style={{ fontWeight: "600" }}>
                             prodMonth:
                           </p>
                           <p className="mb-1 height-box" style={{ fontWeight: "600" }}>
                             Remarks:
                           </p>
                           <p className="mb-1 height-box" style={{ fontWeight: "600" }}>
                             UsedCar
                           </p>
                           <p className="mb-1 height-box" style={{ fontWeight: "600" }}>
                             VehicleId:
                           </p>
                           <p className="mb-1 height-box" style={{ fontWeight: "600" }}>
                             Volume:
                           </p>
                           <p className="mb-1 height-box" style={{ fontWeight: "600" }}>
                             VolumeInCBM:
                           </p>
                           <p className="mb-1 height-box" style={{ fontWeight: "600" }}>
                             volumeUom:
                           </p>
                           <p className="mb-1 height-box" style={{ fontWeight: "600" }}>
                             Weight:
                           </p>
                           <p className="mb-1 height-box" style={{ fontWeight: "600" }}>
                             Weight(Kg):
                           </p>
                           <p className="mb-1 height-box" style={{ fontWeight: "600" }}>
                             WeightInUom:
                           </p>
                           <p className="mb-1 height-box" style={{ fontWeight: "600" }}>
                             Width:
                           </p>
                           <p className="mb-1 height-box" style={{ fontWeight: "600" }}>
                             Color Code:
                           </p>
                           <p className="mb-1 height-box" style={{ fontWeight: "600" }}>
                             Color:
                           </p>
                             </div>
                             
                               <div className="col-md-6 col-6">
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {vlist[bolvno]?.make}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {vlist[bolvno]?.model}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {vlist[bolvno]?.casenbr}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {" "}
                                   {vlist[bolvno]?.enginenbr}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {" "}
                                   {vlist[bolvno]?.height}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {" "}
                                   {vlist[bolvno]?.keynbr}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {" "}
                                   {vlist[bolvno]?.length}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {" "}
                                   {vlist[bolvno]?.prodmonth}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {" "}
                                   {vlist[bolvno]?.remarks}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {" "}
                                   {vlist[bolvno]?.usedcar}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {" "}
                                   {vlist[bolvno]?.vehicleid}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {" "}
                                   {vlist[bolvno]?.volume}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {" "}
                                   {vlist[bolvno]?.volumeincbm}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {" "}
                                   {vlist[bolvno]?.volumeuom}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {" "}
                                   {vlist[bolvno]?.weight}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {" "}
                                   {vlist[bolvno]?.weightinkg}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {" "}
                                   {vlist[bolvno]?.weightuom}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {" "}
                                   {vlist[bolvno]?.width}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {" "}
                                   {vlist[bolvno]?.colorcode}
                                 </p>
                                 <p
                                   className="mb-1 height-box"
                                   style={{ color: "#676767" }}
                                 >
                                   {" "}
                                   {vlist[bolvno]?.color}
                                 </p>
                               </div>
                           
                           </div>
                         </div>
                       </div>
                     </div>

                    }
                    
                    </div>
                  </>
                )}
              </div>
            </div>

            {
              (status_code===7 || status_code===5) ?
              <div className="row">
              <div className="col-md-2 col-6">
                <button
                  title="View/Re-process/View JSon"
                  type="button"
                  onClick={() => handleReprocess()}
                  className="btn btn-block btn-sm text-white"
                  style={{ background: "#A48D6B" }}
                >
                  Re-Process &nbsp;<i className="fa fa-refresh"></i>
                </button>
              </div>
            </div>
            :
            <div className="row">
              <div className="col-md-2 col-6">
                <button
                  title="View/Re-process/View JSon"
                  type="button"
                  onClick={() => clearMessage()}
                  className="btn btn-block btn-sm text-white"
                  style={{ background: "#A48D6B" }}
                >
                  Clear All &nbsp;<i className="fa fa-refresh"></i>
                </button>
              </div>
            </div>
}
             
          </div>
        </section>
      </div>
      <aside className="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
};

export default MessageDetail;
