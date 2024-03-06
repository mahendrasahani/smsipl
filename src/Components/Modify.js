import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import {useLocation } from "react-router";
import Apis from "../Services/ApiServices/Apis";
import Header from "./Header";

const Modify = () => {
  const location = useLocation();
  const id = location?.state?.id?location?.state?.id:212;
 
  const hidden = useSelector((state) => state.hiddenstate.hidden);
  // const [bolno, setbolno] = useState(location?.state?.bolno);
  const [bolno, setbolno] = useState("");
  
  useEffect(()=>{
       if(location?.state?.bolno){
        setbolno(location?.state?.bolno)
       }
       else{
         setbolno("SENTINDDEL00102")
       }
  },[])

  const [cargono, setCargono] = useState(0);
  const [bollist, setbollist] = useState([]);
  const [cargolist, setcargoList] = useState(bollist[0]?.bolcargos);

  const [cntrno, setCntrno] = useState(0);
  const [cntrlist, setCntrList] = useState(bollist[0]?.bolcntrs);
  const [bolvno, setbolvno] = useState(0);
  const [vlist, setVlist] = useState(bollist[0]?.bolvehicles);

  const [message, setMessage] = useState([]);

  const [errorlist, seterrorlist] = useState([]);
  const [vessel, setVessel] = useState({});
  const [loading, setLoading] = useState(true);

  const [bollistdata, setbollistdata] = useState({
    bolID: 0,
    vesselid: 0,
    messageID: 0,
    vesselVisitCode: "",
    bolNbr: "",
    tradeMode: "",
    consignee: "",
    shipper: "",
    notifier: "",
    org: "",
    pol: "",
    pod: "",
    dst: "",
    cargoCode: "",
    userDefinedName0: "",
    userDefinedName1: "",
    userDefinedName2: "",
    userDefinedName3: "",
    userDefinedName4: "",
    userDefinedName5: "",
  userDefinedName6: "",
    userDefinedName7: "",
  userDefinedName8: "",
    userDefinedName9: "",
    userDefinedCode0: "",
    userDefinedCode1: "",
    userDefinedCode2: "",
    userDefinedCode3: "",
    userDefinedCode4: "",
    userDefinedCode5: "",
    userDefinedCode6: "",
  userDefinedCode7: "",
    userDefinedCode8: "",
    userDefinedCode9: "",
    userDefinedNbr0:0,
    userDefinedNbr1:0,
    userDefinedNbr2:0,
    userDefinedNbr3:0,
    userDefinedNbr4 :0,
    userDefinedNbr5:0,
    userDefinedNbr6:0,
    userDefinedNbr7:0,
    userDefinedNbr8:0,
    userDefinedNbr9:0,
    userDefinedTime0: "",
    userDefinedTime1: "",
    userDefinedTime2: "",
    userDefinedTime3: "",
    userDefinedTime4: "",
    userDefinedTime5: "",
    userDefinedTime6: "",
    userDefinedTime7: "",
    userDefinedTime8: "",
  userDefinedTime9: "",
  placeOfDelivery: "",
  crn: "", 
  blType: "",
  loadingPortCode: "",
  loadingPortName: "",
  destinationPlaceCode: "",
  destinationPlaceName: "",
  deliveryPlaceCode: "",
  deliveryPlaceName: "",
    cargoClassificationCode:"",
   cargoClassificationName:"",
   shippingAgentCode: "",
   shippingAgentName: "",
   forwarderCode: "",
   forwarderName: "",
   forwarderTel: "",
   exporterName: "",
   exporterAddress: "",
   exporterTel: "",
   exporterTin: "",
    consigneeAddress:"",
consigneeName:"",
consigneeTel:"",
notifyName:"",
notifyAddress: "",
notifyTel: "",
    bolCargos:cargolist,
    bolCntrs:cntrlist,
    bolVehicles:vlist,
  });

  


  useEffect(()=>{
          setbollistdata({
            bolID:bollist[0]?.primaryid || "",
            vesselid:vessel?.primaryid || "",
            messageID:id,
            vesselVisitCode:bollist[0]?.vesselvisitcode || "",
            bolNbr:bollist[0]?.bolnbr || "",
            tradeMode:bollist[0]?.trademode || "",
            cargoClassificationCode:bollist[0]?.cargoclassificationcode || "",
  cargoClassificationName:bollist[0]?.cargoclassificationname || "",
            consignee:bollist[0]?.consignee || "",
            consigneeAddress:bollist[0]?.consigneeaddress || "",
consigneeName:bollist[0]?.consigneename || "",
consigneeTel:bollist[0]?.consigneetel || "",
            cargoCode:bollist[0]?.cargocode || "",
            pod:bollist[0]?.pod || "",
            shipper:bollist[0]?.shipper || "",
            notifier:bollist[0]?.notifier || "",
            org:bollist[0]?.org || "",
            pol: bollist[0]?.pol || "",
            dst:bollist[0]?.dst || "",
            placeOfDelivery: bollist[0]?.placeofdelivery || "",
            crn:bollist[0]?.crn || "",
            blType:bollist[0]?.bltype || "",
            loadingPortCode:bollist[0]?.loadingportcode || "",
            loadingPortName:bollist[0]?.loadingportname || "",
            destinationPlaceCode:bollist[0]?.destinationplacecode || "",
            destinationPlaceName:bollist[0]?.destinationplacename || "",
            deliveryPlaceCode:bollist[0]?.deliveryplacecode || "",
            deliveryPlaceName:bollist[0]?.deliveryplacename || "",
            userDefinedName1:bollist[0]?.userdefinedname1 || "",
            userDefinedName0:bollist[0]?.userdefinedname0 || "",
            userDefinedName2: bollist[0]?.userdefinedname2 || "",
            userDefinedName3: bollist[0]?.userdefinedname3 || "",
            userDefinedName4: bollist[0]?.userdefinedname4 || "",
            userDefinedName5: bollist[0]?.userdefinedname5 || "",
          userDefinedName6: bollist[0]?.userdefinedname6 || "",
            userDefinedName7: bollist[0]?.userdefinedname7 || "",
          userDefinedName8: bollist[0]?.userdefinedname8 || "",
            userDefinedName9: bollist[0]?.userdefinedname9 || "",
            userDefinedCode0: bollist[0]?.userdefinedcode0 || "",
            userDefinedCode1: bollist[0]?.userdefinedcode1 || "",
            userDefinedCode2: bollist[0]?.userdefinedcode2 || "",
            userDefinedCode3: bollist[0]?.userdefinedcode3 || "",
            userDefinedCode4: bollist[0]?.userdefinedcode4 || "",
            userDefinedCode5: bollist[0]?.userdefinedcode5 || "",
            userDefinedCode6: bollist[0]?.userdefinedcode6 || "",
          userDefinedCode7: bollist[0]?.userdefinedcode7 || "",
            userDefinedCode8: bollist[0]?.userdefinedcode8 || "",
            userDefinedCode9: bollist[0]?.userdefinedcode9 || "",
            userDefinedNbr0:bollist[0]?.userdefinednbr0 || 0,
            userDefinedNbr1:bollist[0]?.userdefinednbr1 || 0,
            userDefinedNbr2:bollist[0]?.userdefinednbr2 || 0,
            userDefinedNbr3:bollist[0]?.userdefinednbr3 || 0,
            userDefinedNbr4:bollist[0]?.userdefinednbr4 || 0,
            userDefinedNbr5:bollist[0]?.userdefinednbr5 || 0,
            userDefinedNbr6:bollist[0]?.userdefinednbr6 || 0,
            userDefinedNbr7:bollist[0]?.userdefinednbr7 || 0,
            userDefinedNbr8:bollist[0]?.userdefinednbr8 || 0,
            userDefinedNbr9:bollist[0]?.userdefinednbr9 || 0,
            userDefinedTime0: bollist[0]?.userdefinedtime0 || "",
            userDefinedTime1: bollist[0]?.userdefinedtime1 || "",
            userDefinedTime2: bollist[0]?.userdefinedtime2 || "",
            userDefinedTime3: bollist[0]?.userdefinedtime3 || "",
            userDefinedTime4: bollist[0]?.userdefinedtime4 || "",
            userDefinedTime5: bollist[0]?.userdefinedtime5 || "",
            userDefinedTime6: bollist[0]?.userdefinedtime6 || "",
            userDefinedTime7: bollist[0]?.userdefinedtime7 || "",
            userDefinedTime8: bollist[0]?.userdefinedtime8 || "",
          userDefinedTime9: bollist[0]?.userdefinedtime9 || "",
          shippingAgentCode:bollist[0]?.shippingagentcode || "",
          shippingAgentName:bollist[0]?.shippingagentname || "",
          forwarderCode:bollist[0]?.forwardercode || "",
          forwarderName:bollist[0]?.forwardername || "",
          forwarderTel:bollist[0]?.forwardertel || "",
          exporterName: bollist[0]?.exportername || "",
          exporterAddress:bollist[0]?.exporteraddress || "",
          exporterTel:bollist[0]?.exportertel || "",
          exporterTin:bollist[0]?.exportertin || "",
          notifyName:bollist[0]?.notifyname || "",
           notifyAddress: bollist[0]?.notifyaddress || "",
            notifyTel: bollist[0]?.notifytel || "",
            bolCargos:cargolist,
            bolCntrs:cntrlist,
            bolVehicles:vlist,
          })
  },[bollist])

  const updatebolcargo = (e) => {
    const updatedList = [...cargolist];
    updatedList[cargono][e.target.name] = e.target.value;
    setcargoList(updatedList);
  };

  const updatebolcntr = (e) => {
    const updatedList = [...cntrlist];
    updatedList[cntrno][e.target.name] = e.target.value;
    setCntrList(updatedList);
  };

  const updatebolv = (e) => {
    const updatedList = [...cargolist];
    updatedList[bolvno][e.target.name] = e.target.value;
    setVlist(updatedList);
  };

  useEffect(() => {
    document.title = "DP WORLD | Dashboard";
  }, []);

  // useEffect(() => {
  //   MessageInfo();
  // }, []);

  // const MessageInfo = async () => {
  //   try {
  //     setLoading(true);
  //     const data = await Apis.getMessageDetails(
  //       "https://dpw1.afrilogitech.com/api",
  //       id
  //     );

   
  //     setMessage(data?.data?.bollist);
  //     setVessel(data?.data?.vessel);
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Error fetching messages:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  const updateInputValue = (e) => {
    setbollistdata((prevValues) => ({
        ...prevValues,
        [e.target.name]: e.target.value,
        bolCargos:cargolist,
        bolCntrs:cntrlist,
        bolVehicles:vlist,
    }));
};

  useEffect(() => {
    const filtererror = message?.filter((itm) => itm?.errorlist !== null);
    seterrorlist(filtererror);
  }, []);

  useEffect(() => {
    const filterbol =
      message && message?.filter((itm) => itm?.bolnbr === bolno);
    setbollist(filterbol);
  }, [bolno, message]);

  useEffect(() => {
    setcargoList(bollist[0]?.bolcargos);
  }, [cargono, bollist, message]);

  useEffect(() => {
    setCntrList(bollist[0]?.bolcntrs);
  }, [cntrno, bollist, message]);

  useEffect(() => {
    setVlist(bollist[0]?.bolvehicles);
  }, [bolvno, bollist, message]);



  const submitData = async (e) => {
    e.preventDefault();
    
   (cargolist==null)?bollistdata.bolCargos=[]:bollistdata.bolCargos=cargolist;
   (cntrlist==null)?bollistdata.bolCntrs=[]:bollistdata.bolCntrs=cntrlist;
   (vlist==null)?bollistdata.bolVehicles=[]:bollistdata.bolVehicles=vlist;

   
 
    const response=await Apis.UpdateBOLMessage(
      "https://dpw1.afrilogitech.com/api",
      bollistdata
    );
    
    if(response && response?.success===true){
      alert("Save and update successfully")
      // window.location.href="/dashboard";
    }

    else{
      alert(response?.message)
    }
  };

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
                  Messages
                </h1>
                <ol className="breadcrumb ">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/messages">Transfer failed</a>
                  </li>
                  <li className="breadcrumb-item active">Messages Modify</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content pb-3">
          <div className="container-fluid">
            <div className="card">
              <div className="card-body">
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>BoL Number:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="bolNbr"
                      value={bollistdata?.bolNbr}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Cargo Classification Code:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="cargoClassificationCode"
                      value={bollistdata?.cargoClassificationCode}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Cargo Classification Name:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="cargoClassificationCame"
                      value={bollistdata?.cargoClassificationName}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Consignee:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="consignee"
                      value={bollistdata?.consignee}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Consignee Address:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="consigneeAddress"
                      value={bollistdata?.consigneeAddress}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Consignee Name:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="consigneeName"
                      value={bollistdata?.consigneeName}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Consignee Tel:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="consigneeTel"
                      value={bollistdata?.consigneeTel}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Cargo Code:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="cargoCode"
                      value={bollistdata?.cargoCode}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>POD:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="pod"
                      value={bollistdata?.pod}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Shipper:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="shipper"
                      value={bollistdata?.shipper}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Notifier:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="notifier"
                      value={bollistdata?.notifier}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Org:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="org"
                      value={bollistdata?.org}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Pol:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="pol"
                      value={bollistdata?.pol}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Dst:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="dst"
                      value={bollistdata?.dst}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Place Of Delivery:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="placeOfDelivery"
                      value={bollistdata?.placeOfDelivery}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Crn:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="crn"
                      value={bollistdata?.crn}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Bl Type:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="blType"
                      value={bollistdata?.blType}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Loading Port Code:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="loadingPortCode"
                      value={bollistdata?.loadingPortCode}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Loading Port Name:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="loadingPortName"
                      value={bollistdata?.loadingPortName}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Destination Place Code:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="destinationPlaceCode"
                      value={bollistdata?.destinationPlaceCode}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Destination Place Name:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="destinationPlaceName"
                      value={bollistdata?.destinationPlaceName}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Delivery Place Code:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="deliveryPlaceCode"
                      value={bollistdata?.deliveryPlaceCode}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                  </div>

                  <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Delivery Place Name:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="deliveryPlaceName"
                      value={bollistdata?.deliveryPlaceName}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Notify Address:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="notifyAddress"
                      value={bollistdata?.notifyAddress}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Notify Name:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="notifyName"
                      value={bollistdata?.notifyName}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Notify Tel:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="notifyTel"
                      value={bollistdata?.notifyTel}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                  
  
  
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Shipping Agent Code:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="shippingAgentCode"
                      value={bollistdata?.shippingAgentCode}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Shipping Agent Name:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="shippingAgentName"
                      value={bollistdata?.shippingAgentName}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Forwarder Code:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="forwarderCode"
                      value={bollistdata?.forwarderCode}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Forwarder Name:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="forwarderName"
                      value={bollistdata?.forwarderName}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Forwarder Tel:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="forwarderTel"
                      value={bollistdata?.forwarderTel}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Exporter Address:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="exporterAddress"
                      value={bollistdata?.exporterAddress}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Exporter Name:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="exporterName"
                      value={bollistdata?.exporterName}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Exporter Tel:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="exporterTel"
                      value={bollistdata?.exporterTel}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>Exporter Tin:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="exporterTin"
                      value={bollistdata?.exporterTin}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedName0:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedName0"
                      value={bollistdata?.userDefinedName0}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedName1:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedName1"
                      value={bollistdata?.userDefinedName1}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedName2:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedName2"
                      value={bollistdata?.userDefinedName2}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedName3:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedName3"
                      value={bollistdata?.userDefinedName3}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedName4:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedName4"
                      value={bollistdata?.userDefinedName4}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedName5:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedName5"
                      value={bollistdata?.userDefinedName5}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedName6:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedName6"
                      value={bollistdata?.userDefinedName6}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedName7:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedName7"
                      value={bollistdata?.userDefinedName7}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedName8:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedName8"
                      value={bollistdata?.userDefinedName8}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedName9:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedName9"
                      value={bollistdata?.userDefinedName9}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedCode0:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedCode0"
                      value={bollistdata?.userDefinedCode0}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedCode1:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedCode1"
                      value={bollistdata?.userDefinedCode1}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedCode2:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedCode2"
                      value={bollistdata?.userDefinedCode2}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedCode3:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedCode3"
                      value={bollistdata?.userDefinedCode3}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedCode4:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedCode4"
                      value={bollistdata?.userDefinedCode4}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedCode5:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedCode5"
                      value={bollistdata?.userDefinedCode5}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedCode6:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedCode6"
                      value={bollistdata?.userDefinedCode6}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedCode7:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedCode7"
                      value={bollistdata?.userDefinedCode7}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedCode8:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedCode8"
                      value={bollistdata?.userDefinedCode8}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedCode9:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedCode9"
                      value={bollistdata?.userDefinedCode9}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedNbr0:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      name="userDefinedNbr0"
                      value={bollistdata?.userDefinedNbr0}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedNbr1:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      name="userDefinedNbr1"
                      value={bollistdata?.userDefinedNbr1}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedNbr2:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      name="userDefinedNbr2"
                      value={bollistdata?.userDefinedNbr2}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedNbr3:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      name="userDefinedNbr3"
                      value={bollistdata?.userDefinedNbr3}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedNbr4:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      name="userDefinedNbr4"
                      value={bollistdata?.userDefinedNbr4}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedNbr5:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      name="userDefinedNbr5"
                      value={bollistdata?.userDefinedNbr5}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedNbr6:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      name="userDefinedNbr6"
                      value={bollistdata?.userDefinedNbr6}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedNbr7:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      name="userDefinedNbr7"
                      value={bollistdata?.userDefinedNbr7}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedNbr8:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      name="userDefinedNbr8"
                      value={bollistdata?.userDefinedNbr8}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedNbr9:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      name="userDefinedNbr9"
                      value={bollistdata?.userDefinedNbr9}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedTime0:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedTime0"
                      value={bollistdata?.userDefinedTime0}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedTime1:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedTime1"
                      value={bollistdata?.userDefinedTime1}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedTime2:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedTime2"
                      value={bollistdata?.userDefinedTime2}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedTime3:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedTime3"
                      value={bollistdata?.userDefinedTime3}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedTime4:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedTime4"
                      value={bollistdata?.userDefinedTime4}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedTime5:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedTime5"
                      value={bollistdata?.userDefinedTime5}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedTime6:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedTime6"
                      value={bollistdata?.userDefinedTime6}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedTime7:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedTime7"
                      value={bollistdata?.userDefinedTime7}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedTime8:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedTime8"
                      value={bollistdata?.userDefinedTime8}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>UserDefinedTime9:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="userDefinedTime9"
                      value={bollistdata?.userDefinedTime9}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                
                </div>
             
               
               


                <div className="row mt-3">
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
                                  return <option value={i}>{i + 1}</option>;
                                })}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6 col-6">
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              MarAndNbr:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Cargo Type Code:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Description:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Commodity Code:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Hs Code:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Volume In CBM:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Volume:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Volume Uom:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Weight(Kg):
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Weight:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Weight Uom:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Qty:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              QtyUom:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              RefCentrNbr:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Remarks:
                            </p>
                          </div>
                          {cargolist && (
                            <div className="col-md-6 col-6 dataInput">
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="markandnbr"
                                  value={cargolist[cargono]?.markandnbr}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="cargotypecode"
                                  value={cargolist[cargono]?.cargotypecode}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="description"
                                  value={cargolist[cargono]?.description}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="commoditycode"
                                  value={cargolist[cargono]?.commoditycode}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="hscode"
                                  value={cargolist[cargono]?.hscode}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="number"
                                  name="volumecbm"
                                  value={cargolist[cargono]?.volumecbm}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="number"
                                  name="volume"
                                  value={cargolist[cargono]?.volume}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="volumeUom"
                                  value={cargolist[cargono]?.volumeUom}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>

                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="number"
                                  name="weightKg"
                                  value={cargolist[cargono]?.weightKg}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>

                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="number"
                                  name="weight"
                                  value={cargolist[cargono]?.weight}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>

                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="weightUom"
                                  value={cargolist[cargono]?.weightUom}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>

                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="number"
                                  name="qty"
                                  value={cargolist[cargono]?.qty}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="qtyuom"
                                  value={cargolist[cargono]?.qtyuom}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="refcntrnbr"
                                  value={cargolist[cargono]?.refcntrnbr}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>

                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="remarks"
                                  value={cargolist[cargono]?.remarks}
                                  onChange={(e) => updatebolcargo(e)}
                                />
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
                                  return <option value={i}>{i + 1}</option>;
                                })}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6 col-6">
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Cntr Nbr:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Seal1Nbr:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Seal2Nbr:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Seal3Nbr:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              CntrSize:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              CntrBoxOper:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Imdg1:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Imdg2:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Imdg3:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Imdg4:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Gross Weight In Kg:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Frieght Indicator:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Container Package:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Package Unit:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Container Weight:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Cntr Weight Unit:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Container Volume:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Container Vol Unit:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Refer Plug:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Min temp:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Max Temp:
                            </p>
                          </div>

                          {cntrlist && (
                            <div className="col-md-6 col-6 dataInput">
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="cntrnbr"
                                  value={cntrlist[cntrno]?.cntrnbr}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>

                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="seal1nbr"
                                  value={cntrlist[cntrno]?.seal1nbr}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="seal2nbr"
                                  value={cntrlist[cntrno]?.seal2nbr}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="seal3nbr"
                                  value={cntrlist[cntrno]?.seal3nbr}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="cntrsize"
                                  value={cntrlist[cntrno]?.cntrsize}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="cntrboxoper"
                                  value={cntrlist[cntrno]?.cntrboxoper}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="imdg1"
                                  value={cntrlist[cntrno]?.imdg1}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="imdg2"
                                  value={cntrlist[cntrno]?.imdg2}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="imdg3"
                                  value={cntrlist[cntrno]?.imdg3}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="imdg4"
                                  value={cntrlist[cntrno]?.imdg4}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="number"
                                  name="grossweightinkg"
                                  value={cntrlist[cntrno]?.grossweightinkg}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="freightindicator"
                                  value={cntrlist[cntrno]?.freightindicator}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="number"
                                  name="containerpackage"
                                  value={cntrlist[cntrno]?.containerpackage}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="packageunit"
                                  value={cntrlist[cntrno]?.packageunit}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="number"
                                  name="containerweight"
                                  value={cntrlist[cntrno]?.containerweight}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="containerweightunit"
                                  value={cntrlist[cntrno]?.containerweightunit}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="number"
                                  name="containervolume"
                                  value={cntrlist[cntrno]?.containervolume}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="containervolumeunit"
                                  value={cntrlist[cntrno]?.containervolumeunit}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="referplug"
                                  value={cntrlist[cntrno]?.referplug}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="number"
                                  name="mintemp"
                                  value={cntrlist[cntrno]?.mintemp}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="number"
                                  name="maxtemp"
                                  value={cntrlist[cntrno]?.maxtemp}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                            </div>
                          )}
                        </div>
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
                                  return <option value={i}>{i + 1}</option>;
                                })}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6 col-6">
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Make:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Model:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              CaseNbr:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Color:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Color Code:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              EngineNbr:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Height:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              KeyNbr:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Length:
                            </p>

                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              prodMonth:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Remarks:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              UsedCar
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              VehicleId:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Volume:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              VolumeInCBM:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              volumeUom:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Weight:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Weight(Kg):
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              WeightInUom:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Width:
                            </p>
                          </div>

                          {vlist && (
                            <div className="col-md-6 col-6 dataInput">
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="make"
                                  value={vlist[bolvno]?.make}
                                  onChange={(e) => updatebolv(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="model"
                                  value={vlist[bolvno]?.model}
                                  onChange={(e) => updatebolv(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="casenbr"
                                  value={vlist[bolvno]?.casenbr}
                                  onChange={(e) => updatebolv(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="color"
                                  value={vlist[bolvno]?.color}
                                  onChange={(e) => updatebolv(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="colorcode"
                                  value={vlist[bolvno]?.colorcode}
                                  onChange={(e) => updatebolv(e)}
                                />
                              </p>
                              <p
                                className="mb-1"
                                style={{ color: "#676767" }}
                                onChange={(e) => updatebolv(e)}
                              >
                                <input
                                  type="text"
                                  name="enginenbr"
                                  value={vlist[bolvno]?.enginenbr}
                                  onChange={(e) => updatebolv(e)}
                                />
                              </p>
                              <p
                                className="mb-1"
                                style={{ color: "#676767" }}
                                onChange={(e) => updatebolv(e)}
                              >
                                <input
                                  type="number"
                                  name="height"
                                  value={vlist[bolvno]?.height}
                                  onChange={(e) => updatebolv(e)}
                                />
                              </p>
                              <p
                                className="mb-1"
                                style={{ color: "#676767" }}
                                onChange={(e) => updatebolv(e)}
                              >
                                <input
                                  type="text"
                                  name="keynbr"
                                  value={vlist[bolvno]?.keynbr}
                                  onChange={(e) => updatebolv(e)}
                                />
                              </p>
                              <p
                                className="mb-1"
                                style={{ color: "#676767" }}
                                onChange={(e) => updatebolv(e)}
                              >
                                <input
                                  type="number"
                                  name="length"
                                  value={vlist[bolvno]?.length}
                                  onChange={(e) => updatebolv(e)}
                                />
                              </p>
                              <p
                                className="mb-1"
                                style={{ color: "#676767" }}
                                onChange={(e) => updatebolv(e)}
                              >
                                <input
                                  type="text"
                                  name="prodmonth"
                                  value={vlist[bolvno]?.prodmonth}
                                  onChange={(e) => updatebolv(e)}
                                />{" "}
                              </p>
                              <p
                                className="mb-1"
                                style={{ color: "#676767" }}
                                onChange={(e) => updatebolv(e)}
                              >
                                <input
                                  type="text"
                                  name="remarks"
                                  value={vlist[bolvno]?.remarks}
                                  onChange={(e) => updatebolv(e)}
                                />{" "}
                              </p>
                              <p
                                className="mb-1"
                                style={{ color: "#676767" }}
                                onChange={(e) => updatebolv(e)}
                              >
                                <input
                                  type="text"
                                  name="usedcar"
                                  value={vlist[bolvno]?.usedcar}
                                  onChange={(e) => updatebolv(e)}
                                />{" "}
                              </p>
                              <p
                                className="mb-1"
                                style={{ color: "#676767" }}
                                onChange={(e) => updatebolv(e)}
                              >
                                <input
                                  type="text"
                                  name="vehicleid"
                                  value={vlist[bolvno]?.vehicleid}
                                  onChange={(e) => updatebolv(e)}
                                />{" "}
                              </p>
                              <p
                                className="mb-1"
                                style={{ color: "#676767" }}
                                onChange={(e) => updatebolv(e)}
                              >
                                <input
                                  type="number"
                                  name="volume"
                                  value={vlist[bolvno]?.volume}
                                  onChange={(e) => updatebolv(e)}
                                />{" "}
                              </p>
                              <p
                                className="mb-1"
                                style={{ color: "#676767" }}
                                onChange={(e) => updatebolv(e)}
                              >
                                <input
                                  type="number"
                                  name="volumeincbm"
                                  value={vlist[bolvno]?.volumeincbm}
                                  onChange={(e) => updatebolv(e)}
                                />{" "}
                              </p>
                              <p
                                className="mb-1"
                                style={{ color: "#676767" }}
                                onChange={(e) => updatebolv(e)}
                              >
                                <input
                                  type="text"
                                  name="volumeuom"
                                  value={vlist[bolvno]?.volumeuom}
                                  onChange={(e) => updatebolv(e)}
                                />{" "}
                              </p>
                              <p
                                className="mb-1"
                                style={{ color: "#676767" }}
                                onChange={(e) => updatebolv(e)}
                              >
                                <input
                                  type="number"
                                  name="weight"
                                  value={vlist[bolvno]?.weight}
                                  onChange={(e) => updatebolv(e)}
                                />{" "}
                              </p>
                              <p
                                className="mb-1"
                                style={{ color: "#676767" }}
                                onChange={(e) => updatebolv(e)}
                              >
                                <input
                                  type="number"
                                  name="weightInKg"
                                  value={vlist[bolvno]?.weightinkg}
                                  onChange={(e) => updatebolv(e)}
                                />{" "}
                              </p>
                              <p
                                className="mb-1"
                                style={{ color: "#676767" }}
                                onChange={(e) => updatebolv(e)}
                              >
                                <input
                                  type="text"
                                  name="weightuom"
                                  value={vlist[bolvno]?.weightuom}
                                  onChange={(e) => updatebolv(e)}
                                />{" "}
                              </p>
                              <p
                                className="mb-1"
                                style={{ color: "#676767" }}
                                onChange={(e) => updatebolv(e)}
                              >
                                <input
                                  type="text"
                                  name="width"
                                  value={vlist[bolvno]?.width}
                                  onChange={(e) => updatebolv(e)}
                                />{" "}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
              
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
              <button
                type="button"
                className="btn btn-block text-white col-md-2 mt-2"
                style={{ backgroundColor: "#547899" }}
                onClick={(e) => submitData(e)}
              >
                Save & Update
              </button>
       
          </div>
        </section>
      </div>
      <aside className="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
};

export default Modify;
