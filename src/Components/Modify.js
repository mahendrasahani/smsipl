import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import Apis from "../Services/ApiServices/Apis";
import Header from "./Header";

const Modify = () => {
  const location = useLocation();
  const id = location?.state?.id;
  const items = useSelector((state) => state.Items.items);

  const hidden = useSelector((state) => state.hiddenstate.hidden);
  const [bolno, setbolno] = useState(location?.state?.bolno);
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
    bolnbr: "",
    TradeMode: "",
    consignee: "",
    cargocode: "",
    pod: "",
    shipper: "",
    notifier: "",
    org: "",
    pol: "",
    dst: "",
    placeofdvy: "",
    crno: "",
    BlType: "",
    LoadingPortCode: "",
    LoadingPortName: "",
    DestinationPlaceCode: "",
    DestinationPlaceName: "",
    DeliveryPlaceCode: "",
    bolCargos:cargolist,
    bolCntrs:cntrlist,
    bolVehicles:vlist,
  });


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

      console.log("data", data);
      setMessage(data?.data?.bollist);
      setVessel(data?.data?.vessel);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };



  const updateInputValue = (e) => {
    setbollist(prevState => [{...prevState[0], [e.target.name] : e.target.value}]);
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
    bollist[0].bolcargos=cargolist;
    bollist[0].bolcntrs=cntrlist;
    bollist[0].bolvehicles=vlist;
    console.log("values",bollist)
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
                    <a href="dashboard">Home</a>
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
                      name="bolnbr"
                      value={bollist[0]?.bolnbr}
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
                      value={bollist[0]?.consignee}
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
                      name="cargocode"
                      value={bollist[0]?.cargocode}
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
                      value={bollist[0]?.pod}
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
                      value={bollist[0]?.shipper}
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
                      value={bollist[0]?.notifier}
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
                      value={bollist[0]?.org}
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
                      value={bollist[0]?.pol}
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
                      value={bollist[0]?.dst}
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
                      name="placeofdelivery"
                      value={bollist[0]?.placeofdelivery}
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
                      value={bollist[0]?.crn}
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
                      name="bltype"
                      value={bollist[0]?.bltype}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>LoadingPortCode:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="loadingportcode"
                      value={bollist[0]?.loadingportcode}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>LoadingPortName:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="loadingportname"
                      value={bollist[0]?.loadingportname}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>DestinationPlaceCode:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="destinationplacecode"
                      value={bollist[0]?.destinationplacecode}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>DestinationPlaceName:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="destinationplacename"
                      value={bollist[0]?.destinationplacename}
                      onChange={(e) => updateInputValue(e)}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-md-2 col-6">
                    <label>DeliveryPlaceCode:</label>
                  </div>
                  <div className="col-md-3 col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="deliveryplacecode"
                      value={bollist[0]?.deliveryplacecode}
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
                                  type="text"
                                  name="volumecbm"
                                  value={cargolist[cargono]?.volumecbm}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
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
                                  type="text"
                                  name="weightKg"
                                  value={cargolist[cargono]?.weightKg}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>

                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
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
                                  type="text"
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
                                  type="text"
                                  name="grossweightinkg"
                                  value={cntrlist[cntrno]?.grossweightinkg}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="frieghtindicator"
                                  value={cntrlist[cntrno]?.frieghtindicator}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
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
                                  type="text"
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
                                  type="text"
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
                                  type="text"
                                  name="mintemp"
                                  value={cntrlist[cntrno]?.mintemp}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
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
                                  type="text"
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
                                  name="keyNbr"
                                  value={vlist[bolvno]?.keyNbr}
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
                                  name="prodMonth"
                                  value={vlist[bolvno]?.prodMonth}
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
                                  name="usedCar"
                                  value={vlist[bolvno]?.usedCar}
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
                                  name="vehicleId"
                                  value={vlist[bolvno]?.vehicleId}
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
                                  type="text"
                                  name="volumeInCBM"
                                  value={vlist[bolvno]?.volumeInCBM}
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
                                  name="volumeUom"
                                  value={vlist[bolvno]?.volumeUom}
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
                                  type="text"
                                  name="weightInKg"
                                  value={vlist[bolvno]?.weightInKg}
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
                                  name="weightUom"
                                  value={vlist[bolvno]?.weightUom}
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
            <a href="">
              <button
                type="button"
                className="btn btn-block text-white col-md-2 mt-2"
                style={{ backgroundColor: "#547899" }}
                onClick={(e) => submitData(e)}
              >
                Save & Update
              </button>
            </a>
          </div>
        </section>
      </div>
      <aside className="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
};

export default Modify;
