import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import Apis from "../Services/ApiServices/Apis";
import Header from "./Header";

const Modify = () => {
  const location = useLocation();
 console.log("lic",location)
  const id = location?.state?.id;


  const hidden = useSelector((state) => state.hiddenstate.hidden);
  const [bolno, setbolno] = useState(location?.state?.bolno);
  const [cargono, setCargono] = useState("");
  const [cargolist, setcargoList] = useState([]);
  const [cntrno, setCntrno] = useState("");
  const [cntrlist, setCntrList] = useState([]);
  const [bolvno, setbolvno] = useState("");
  const [vlist, setVlist] = useState([]);

  const [message, setMessage] = useState([]);
  const [bollist, setbollist] = useState([]);
  const [errorlist, seterrorlist] = useState([]);
  const [vessel, setVessel] = useState({});
  const [loading, setLoading] = useState(true);

  const [bollistdata, setbollistdata] = useState({
    bolnbr: "",
    consignee: "",
    cargocode: "",
    pod: "",
    shipper:"",
    notifier:"",
    org:"",
    pol:"",
    dst:"",
    placeofdvy:"",
    crno:"",
    BlType:"",

// LoadingPortCode:
// LoadingPortName:
// DestinationPlaceCode:
// DestinationPlaceName:
// DeliveryPlaceCode:

  });

  const [bolcargodata, setbolcargodata] = useState({
    markandnbr: "",
    description: "",
    qty: "",
    qtyuom: "",
    refcntrnbr: "",
  });

  const [bolcntrdata, setbolcntrdata] = useState({
    cntrnbr: "",
    seal1nbr: "",
    cntrsize: "",
  });

  const [bolvdata, setbolvdata] = useState({
    make: "",
    model: "",
    casenbr: "",
    enginenbr: "",
  });

  const updatebolcargo = (e) => {
    setbolcargodata((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const updatebolcntr = (e) => {
    setbolcntrdata((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const updatebolv = (e) => {
    setbolvdata((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
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

      console.log("data", data?.data);
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
    if (cargolist) {
      setbolcargodata({
        markandnbr: cargolist[0]?.markandnbr,
        description: cargolist[0]?.description,
        qty: cargolist[0]?.qty,
        qtyuom: cargolist[0]?.qtyuom,
        refcntrnbr: cargolist[0]?.refcntrnbr,
      });
    }
  }, [cargolist]);

  useEffect(() => {
    if (cntrlist) {
      setbolcntrdata({
        cntrnbr: cntrlist[0]?.cntrnbr,
        seal1nbr: cntrlist[0]?.seal1nbr,
        cntrsize: cntrlist[0]?.cntrsize,
      });
    }
  }, [cntrlist]);

  useEffect(() => {
    if (vlist) {
      setbolvdata({
        make: vlist[0]?.make,
        model: vlist[0]?.model,
        casenbr: vlist[0]?.casenbr,
        enginenbr: vlist[0]?.enginenbr,
      });
    }
  }, [vlist]);

  useEffect(() => {
    if (bollist) {
      setbollistdata({
        bolnbr: bollist[0]?.bolnbr,
        consignee: bollist[0]?.consignee,
        cargocode: bollist[0]?.cargocode,
        pod: bollist[0]?.pod,
      });
    }
  }, [bollist]);

  const updateInputValue = (e) => {
    setbollistdata((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
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
    console.log("vlis", vlist);
  }, [bolvno, bollist, message]);

  console.log("databoibllist",bollistdata)

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
                      value={bollistdata.bolnbr}
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
                      value={bollistdata.consignee}
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
                      value={bollistdata?.cargocode}
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
                      value={bollistdata.pod}
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
                      name="pod"
                      value={bollistdata.pod}
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
                      name="pod"
                      value={bollistdata.pod}
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
                      name="pod"
                      value={bollistdata.pod}
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
                      name="pod"
                      value={bollistdata.pod}
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
                      name="pod"
                      value={bollistdata.pod}
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
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              MarAndNbr:
                            </p>
                            <p className="mb-2" style={{ fontWeight: "600" }}>
                              Description:
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
                          </div>
                          {cargolist && (
                            <div className="col-md-6 col-6">
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="markandnbr"
                                  value={bolcargodata.markandnbr}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="description"
                                  value={bolcargodata.description}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="qty"
                                  value={bolcargodata?.qty}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="qtyuom"
                                  value={bolcargodata?.qtyuom}
                                  onChange={(e) => updatebolcargo(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="refcntrnbr"
                                  value={bolcargodata?.refcntrnbr}
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
                                  return (
                                    <option id={itm.cntrnbr}>{i + 1}</option>
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
                              <p className="mb-2" style={{ fontWeight: "600" }}>
                                cntrNbr:
                              </p>
                              <p className="mb-2" style={{ fontWeight: "600" }}>
                                Seal1Nbr:
                              </p>
                              <p className="mb-2" style={{ fontWeight: "600" }}>
                                CntrSize:
                              </p>
                            </div>

                            <div className="col-md-6 col-6">
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="cntrnbr"
                                  value={bolcntrdata.cntrnbr}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="seal1nbr"
                                  value={bolcntrdata.seal1nbr}
                                  onChange={(e) => updatebolcntr(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="cntrsize"
                                  value={bolcntrdata.cntrsize}
                                  onChange={(e) => updatebolcntr(e)}
                                />
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
                                    <option id={itm.casenbr}>{i + 1}</option>
                                  );
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
                              EngineNbr:
                            </p>
                          </div>
                          {vlist && (
                            <div className="col-md-6 col-6">
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="make"
                                  value={bolvdata.make}
                                  onChange={(e) => updatebolv(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="model"
                                  value={bolvdata.model}
                                  onChange={(e) => updatebolv(e)}
                                />
                              </p>
                              <p className="mb-1" style={{ color: "#676767" }}>
                                <input
                                  type="text"
                                  name="casenbr"
                                  value={bolvdata.casenbr}
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
                                  value={bolvdata.enginenbr}
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
            <a href="/dashboard">
              <button
                type="button"
                className="btn btn-block text-white col-md-2 mt-2"
                style={{ backgroundColor: "#547899" }}
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
