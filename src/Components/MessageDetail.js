import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Apis from '../Services/ApiServices/Apis';

const MessageDetail = () => {
  
        const {id}=useParams();
       
    const hidden = useSelector((state) => state.hiddenstate.hidden);
     
    const [message,setMessage]=useState([]);
    const [vessel,setVessel]=useState({})
    const [loading,setLoading] =useState(true)

    // useEffect(()=>{  
    //     MessageInfo();
    //   },[])
    
      
    //     const MessageInfo=async()=>{
    //       try {
    //         setLoading(true);
    //         const data= await Apis.getMessageDetails('https://dpw1.afrilogitech.com/api',id);
    //         console.log("message",data.data.bollist)
    //         console.log("data",data?.data)
    //         setMessage(data?.data?.bollist)
    //         setVessel(data?.data?.vessel)
    //       } catch (error) {
    //         setLoading(false);
    //         console.error("Error fetching messages:", error);
    //       } finally {
    //         setLoading(false);
    //       }
        
    //     }
    
  return (
    <div class="wrapper">

    {/* <div class="preloader flex-column justify-content-center align-items-center">
      <img src="img/logo.png" alt="Logo" class="img-fluid" />
    </div>
   */}

    <Header/>

    <Sidebar/>
  
      <div class="content-wrapper" style={{marginLeft:hidden&&"0"}}>
          <div class="content-header">
              <div class="container-fluid">
                  <div class="row mb-2">
                      <div class="col-sm-12">
                          <h1 class="m-0" style={{color:"#1B106D",fontWeight:"bold"}}>Message Details</h1>
                          <ol class="breadcrumb">
                              <li class="breadcrumb-item"><a href="home.html">Home</a></li>
                              <li class="breadcrumb-item"><a href="Messages.html">Messages</a></li>
                              <li class="breadcrumb-item active">Transfer failed</li>
                          </ol>
                      </div>
                  </div>
              </div>
          </div>
  
          
          <section class="content pb-4">
              <div class="container-fluid">
                  <div class="card">
                      <div class="card-body">
                          <h5>Message Details</h5>
                          <div class="row mt-3">
                              <div class="col-md-2 col-6">
                                  <p class="mb-0" style={{fontWeight: "600"}}>MRN No:</p>
                                  <p class="mb-0" style={{fontWeight: "600"}}>Vessels code:</p>
                                  <p class="mb-0" style={{fontWeight: "600"}}>Cargo Code:</p>
                                  <p class="mb-0" style={{fontWeight: "600"}}>Bol Count:</p>
                              </div>
                              <div class="col-md-3 col-6">
                                  <p class="mb-0" style={{color:"#676767"}}>24MEA000079</p>
                                  <p class="mb-0" style={{color:"#676767"}}>OMLB103</p>
                                  <p class="mb-0" style={{color:"#676767"}}>C</p>
                                  <p class="mb-0" style={{color:"#676767"}}>03</p>
                              </div>
                              <div class="col-md-3 col-6" id="todate-div">
                                  <p class="mb-0" style={{fontWeight:"600"}}>Carrier name:</p>
                                  <p class="mb-0" style={{fontWeight:"600"}}>Departure port name:</p>
                                  <p class="mb-0" style={{fontWeight:"600"}}>Cargo Code:</p>
                              </div>
                              <div class="col-md-3 col-6">
                                  <p class="mb-0" style={{color: "#676767"}}>Shipping line 1</p>
                                  <p class="mb-0" style={{color: "#676767"}}>Dubai World central Apt</p>
                                  <p class="mb-0" style={{color: "#676767"}}>Dar Es salaam</p>
                              </div>
                          </div>
                         <hr/>
                          <div class="row">
                              <div class="col-md-3">
                                  <div class="form-group">
                                      <label>Select bol no.</label>
                                      <select class="form-control form-control-sm">
                                          <option>Select BoL no.</option>
                                          <option>option 2</option>
                                          <option>option 3</option>
                                          <option>option 4</option>
                                          <option>option 5</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="col-md-3">
                                  <div class="form-group">
                                      <label>Search bol no.</label>
                                      <input type="text" class="form-control form-control-sm" id="mr-nno" placeholder="Search BoL no."/>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
  
                  <div class="card">
                      <div class="card-body">
                          <div class="row mb-4">
                              <div class="col-md-2 col-6">
                                  <p class="mb-0" style={{fontWeight:"600"}}>BoL Number:</p>
                                  <p class="mb-0" style={{fontWeight:"600"}}>Consignee:</p>
                                  <p class="mb-0" style={{fontWeight:"600"}}>Cargo Code:</p>
                                  <p class="mb-0" style={{fontWeight:"600"}}>POD:</p>
                              </div>
                              <div class="col-md-3 col-6">
                                  <p class="mb-0" style={{color:"#676767"}}>SENTINDDEL00101</p>
                                  <p class="mb-0" style={{color:"#676767"}}>ALIAH</p>
                                  <p class="mb-0" style={{color:"#676767"}}>C</p>
                                  <p class="mb-0" style={{color:"#676767"}}>WTTZDL001-TPA TERMINAL</p>
                              </div>
                          </div>
                          <div class="row">
                              <div class="col-md-4 pr-0">
                                  <div class="card" style={{height:"100%"}}>
                                      <div class="card-header">
                                          <div class="row">
                                              <div class="col-md-9 col-9">
                                                  <h3 class="card-title">Cargo</h3>
                                              </div>
                                              <div class="col-md-3 col-3">
                                                  <select class="form-control form-control-sm">
                                                      <option>1</option>
                                                  </select>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="card-body">                     
                                      <div class="row">
                                              <div class="col-md-6 col-6">
                                                  <p class="mb-1" style={{fontWeight:"600"}}>MarAndNbr:</p>
                                                  <p class="mb-1" style={{fontWeight:"600"}}>Description:</p>
                                                  <p class="mb-1" style={{fontWeight:"600"}}>Qty:</p>
                                                  <p class="mb-1" style={{fontWeight:"600"}}>QtyUom:</p>
                                                  <p class="mb-1" style={{fontWeight:"600"}}>RefCentrNbr:</p>
                                              </div>
                                              <div class="col-md-6 col-6">
                                                  <p class="mb-1" style={{color:"#676767"}}>MSNC01</p>
                                                  <p class="mb-1" style={{color:"#676767"}}>TV</p>
                                                  <p class="mb-1" style={{color:"#676767"}}>100</p>
                                                  <p class="mb-1" style={{color:"#676767"}}>PK</p>
                                                  <p class="mb-1" style={{color:"#676767"}}>KFSU2026775</p>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="col-md-4 pl-0 pr-0">
                                  <div class="card" style={{height:"100%"}}>
                                      <div class="card-header">
                                          <div class="row">
                                              <div class="col-md-9 col-9">
                                                  <h3 class="card-title">Container</h3>
                                              </div>
                                              <div class="col-md-3 col-3">
                                                  <select class="form-control form-control-sm">
                                                      <option>1</option>
                                                  </select>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="card-body">
                                          <div class="row">
                                              <div class="col-md-6 col-6">
                                                  <p class="mb-1" style={{fontWeight:"600"}}>cntrNbr:</p>
                                                  <p class="mb-1" style={{fontWeight:"600"}}>Seal1Nbr:</p>
                                                  <p class="mb-1" style={{fontWeight:"600"}}>CntrSize:</p>
                                              </div>
                                              <div class="col-md-6 col-6">
                                                  <p class="mb-1" style={{color:"#676767"}}>KFSU2026775</p>
                                                  <p class="mb-1" style={{color:"#676767"}}>C56WE965</p>
                                                  <p class="mb-1" style={{color:"#676767"}}>40</p>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="col-md-4 pl-0">
                                  <div class="card" style={{height:"100%"}}>
                                      <div class="card-header">
                                          <div class="row">
                                              <div class="col-md-9 col-9">
                                                  <h3 class="card-title">Vehicles</h3>
                                              </div>
                                              <div class="col-md-3 col-3">
                                                  <select class="form-control form-control-sm">
                                                      <option>1</option>
                                                  </select>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="card-body">
                                          <div class="row">
                                              <div class="col-md-6 col-6">
                                                  <p class="mb-1" style={{fontWeight:"600"}}>Make:</p>
                                                  <p class="mb-1"  style={{fontWeight:"600"}}>Model:</p>
                                                  <p class="mb-1"  style={{fontWeight:"600"}}>CaseNbr:</p>
                                                  <p class="mb-1"  style={{fontWeight:"600"}}>EngineNbr:</p>
                                              </div>
                                              <div class="col-md-6 col-6">
                                                  <p class="mb-1" style={{color:"#676767"}}>KFSU2026775</p>
                                                  <p class="mb-1" style={{color:"#676767"}}>C56WE965</p>
                                                  <p class="mb-1" style={{color:"#676767"}}>40</p>
                                                  <p class="mb-1" style={{color:"#676767"}}></p>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
  
                  <div class="card">
                      <div class="card-body">
                          <h5>Status:<span style={{color:"#991414"}}> Transfer Failed</span></h5>
                          <div class="text-muted">Error</div>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tempus, arcu eu pretium consequat, purus orci vulputate 
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-2 col-6">
                          <a href="msg_Modify.html"><button type="button" class="btn btn-block btn-sm text-white" style={{background:"#547899"}}
                          >Modify &nbsp;<i class="fa fa-edit"></i></button></a>
                      </div>
                      <div class="col-md-2 col-6">
                          <button type="button" class="btn btn-block btn-sm text-white" style={{background:"#A48D6B"}}
                          >Clear all &nbsp;<i class="fa fa-refresh"></i></button>
                      </div>
                  </div>
              </div>
          </section>
      </div>
      <aside class="control-sidebar control-sidebar-dark"></aside>
  </div>
  );
}

export default MessageDetail;
