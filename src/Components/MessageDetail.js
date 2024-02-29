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
    <div classname="wrapper">

    {/* <div classname="preloader flex-column justify-content-center align-items-center">
      <img src="img/logo.png" alt="Logo" classname="img-fluid" />
    </div>
   */}

    <Header/>

    <Sidebar/>
  
  
      <div classname="content-wrapper" style={{marginLeft:hidden&&"0"}}>
		<div classname="content-header">
			<div classname="container-fluid">
				<div classname="row mb-2">
					<div classname="col-sm-12">
						<h1 classname="m-0" style={{color:"#1B106D",fontWeight:"bold"}}>Message Details</h1>
						<ol classname="breadcrumb">
							<li classname="breadcrumb-item"><a href="home.html">Home</a></li>
                            <li classname="breadcrumb-item"><a href="Messages.html">Messages</a></li>
							<li classname="breadcrumb-item active">Transfer failed</li>
						</ol>
					</div>
				</div>
			</div>
		</div>

        
		<section classname="content pb-4">
			<div classname="container-fluid">
				<div classname="card">
					<div classname="card-body">
                        <h5>Message Details</h5>
                        <div classname="row mt-3">
                            <div classname="col-md-2 col-6">
                                <p classname="mb-0" style={{fontWeight:"600"}}>MRN No:</p>
                                <p classname="mb-0" style={{fontWeight:"600"}}>Vessels code:</p>
                                <p classname="mb-0" style={{fontWeight:"600"}}>Cargo Code:</p>
                                <p classname="mb-0" style={{fontWeight:"600"}}>Bol Count:</p>
                            </div>
                            <div classname="col-md-3 col-6">
                                <p classname="mb-0"  style={{color:"#676767"}}>24MEA000079</p>
                                <p classname="mb-0"  style={{color:"#676767"}}>OMLB103</p>
                                <p classname="mb-0"  style={{color:"#676767"}}>C</p>
                                <p classname="mb-0"  style={{color:"#676767"}}>03</p>
                            </div>
                            <div classname="col-md-3 col-6" id="todate-div">
                                <p classname="mb-0" style={{fontWeight:"600"}}>Carrier name:</p>
                                <p classname="mb-0" style={{fontWeight:"600"}}>Departure port name:</p>
                                <p classname="mb-0" style={{fontWeight:"600"}}>Cargo Code:</p>
                            </div>
                            <div classname="col-md-3 col-6">
                                <p classname="mb-0"  style={{color:"#676767"}}>Shipping line 1</p>
                                <p classname="mb-0"  style={{color:"#676767"}}>Dubai World central Apt</p>
                                <p classname="mb-0"  style={{color:"#676767"}}>Dar Es salaam</p>
                            </div>
                        </div>
                       <hr/>
                        <h5>Failed BoL List</h5>
                        <div classname="col-md-12 pt-3 table-responsive">
                            <table classname="table table-striped table-sm table-hover text-nowrap">
                                <thead>
                                    <tr style={{background:"#E1E8FF",fontSize:"12px"}}>
                                        <th style="color:#3166C9;">#</th>
                                        <th style="color:#3166C9;">BoL No.</th>
                                        <th style="color:#3166C9;">Error</th>
                                        <th style="color:#3166C9;">Status</th>
                                        <th style="color:#3166C9;">Action</th>
                                    </tr>
                                </thead>
                                <tbody style="font-size: 12px;">
                                    <tr>
                                        <td>1</td>
                                        <td>03</td>
                                        <td></td>
                                        <td style="color:#FF0000;">Transfer Failed</td>
                                        <td>
                                            <a classname="btn btn-sm bg-primary btn-clear" href="msg_Modify.html">
                                                <i classname="fa fa-edit"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>03</td>
                                        <td></td>
                                        <td style="color:#FF0000;">Transfer Failed</td>
                                        <td>
                                            <a classname="btn btn-sm bg-primary btn-clear" href="msg_Modify.html">
                                                <i classname="fa fa-edit"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>03</td>
                                        <td></td>
                                        <td style="color:#FF0000;">Data Insertion Failed</td>
                                        <td>
                                            <a classname="btn btn-sm bg-primary btn-clear" href="msg_Modify.html">
                                                <i classname="fa fa-edit"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
					</div>
				</div>

                <div classname="card">
                    <div classname="card-body">
                        <div classname="row">
                            <div classname="col-md-3">
                                <div classname="form-group">
                                    <label>Select BoL no.</label>
                                    <select classname="form-control form-control-sm">
                                        <option>Select BoL no.</option>
                                        <option>option 2</option>
                                        <option>option 3</option>
                                        <option>option 4</option>
                                        <option>option 5</option>
                                    </select>
                                </div>
                            </div>
                            <div classname="col-md-3">
                                <div classname="form-group">
                                    <label>Search BoL number</label>
                                    <input type="text" classname="form-control form-control-sm" id="mr-nno" placeholder="Search BoL no."/>
                                </div>
                            </div>
                        </div>
                        <div classname="row mb-4">
                            <div classname="col-md-2 col-6">
                                <p classname="mb-0" style={{fontWeight:"600"}}>BoL Number:</p>
                                <p classname="mb-0" style={{fontWeight:"600"}}>Consignee:</p>
                                <p classname="mb-0" style={{fontWeight:"600"}}>Cargo Code:</p>
                                <p classname="mb-0" style={{fontWeight:"600"}}>POD:</p>
                            </div>
                            <div classname="col-md-3 col-6">
                                <p classname="mb-0"  style={{color:"#676767"}}>SENTINDDEL00101</p>
                                <p classname="mb-0"  style={{color:"#676767"}}>ALIAH</p>
                                <p classname="mb-0"  style={{color:"#676767"}}>C</p>
                                <p classname="mb-0"  style={{color:"#676767"}}>WTTZDL001-TPA TERMINAL</p>
                            </div>
                        </div>
                        <div classname="row">
                            <div classname="col-md-4 pr-0">
                                <div classname="card" style="height: 100%;">
                                    <div classname="card-header">
                                        <div classname="row">
                                            <div classname="col-md-9 col-9">
                                                <h3 classname="card-title">Cargo</h3>
                                            </div>
                                            <div classname="col-md-3 col-3">
                                                <select classname="form-control form-control-sm">
                                                    <option>1</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div classname="card-body">
                                        <div classname="row">
                                            <div classname="col-md-6 col-6">
                                                <p classname="mb-1" style={{fontWeight:"600"}}>MarAndNbr:</p>
                                                <p classname="mb-1" style={{fontWeight:"600"}}>Description:</p>
                                                <p classname="mb-1" style={{fontWeight:"600"}}>Qty:</p>
                                                <p classname="mb-1" style={{fontWeight:"600"}}>QtyUom:</p>
                                                <p classname="mb-1" style={{fontWeight:"600"}}>RefCentrNbr:</p>
                                            </div>
                                            <div classname="col-md-6 col-6">
                                                <p classname="mb-1"  style={{color:"#676767"}}>MSNC01</p>
                                                <p classname="mb-1"  style={{color:"#676767"}}>TV</p>
                                                <p classname="mb-1"  style={{color:"#676767"}}>100</p>
                                                <p classname="mb-1"  style={{color:"#676767"}}>PK</p>
                                                <p classname="mb-1"  style={{color:"#676767"}}>KFSU2026775</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div classname="col-md-4 pl-0 pr-0">
                                <div classname="card" style="height: 100%;">
                                    <div classname="card-header">
                                        <div classname="row">
                                            <div classname="col-md-9 col-9">
                                                <h3 classname="card-title">Container</h3>
                                            </div>
                                            <div classname="col-md-3 col-3">
                                                <select classname="form-control form-control-sm">
                                                    <option>1</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div classname="card-body">
                                        <div classname="row">
                                            <div classname="col-md-6 col-6">
                                                <p classname="mb-1" style={{fontWeight:"600"}}>cntrNbr:</p>
                                                <p classname="mb-1" style={{fontWeight:"600"}}>Seal1Nbr:</p>
                                                <p classname="mb-1" style={{fontWeight:"600"}}>CntrSize:</p>
                                            </div>
                                            <div classname="col-md-6 col-6">
                                                <p classname="mb-1"  style={{color:"#676767"}}>KFSU2026775</p>
                                                <p classname="mb-1"  style={{color:"#676767"}}>C56WE965</p>
                                                <p classname="mb-1"  style={{color:"#676767"}}>40</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div classname="col-md-4 pl-0">
                                <div classname="card" style="height: 100%;">
                                    <div classname="card-header">
                                        <div classname="row">
                                            <div classname="col-md-9 col-9">
                                                <h3 classname="card-title">Vehicles</h3>
                                            </div>
                                            <div classname="col-md-3 col-3">
                                                <select classname="form-control form-control-sm">
                                                    <option>1</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div classname="card-body">
                                        <div classname="row">
                                            <div classname="col-md-6 col-6">
                                                <p classname="mb-1" style={{fontWeight:"600"}}>Make:</p>
                                                <p classname="mb-1" style={{fontWeight:"600"}}>Model:</p>
                                                <p classname="mb-1" style={{fontWeight:"600"}}>CaseNbr:</p>
                                                <p classname="mb-1" style={{fontWeight:"600"}}>EngineNbr:</p>
                                            </div>
                                            <div classname="col-md-6 col-6">
                                                <p classname="mb-1" style={{color:"#676767"}}>KFSU2026775</p>
                                                <p classname="mb-1" style={{color:"#676767"}}>C56WE965</p>
                                                <p classname="mb-1" style={{color:"#676767"}}>40</p>
                                                <p classname="mb-1" style={{color:"#676767"}}></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div classname="card">
					<div classname="card-body">
                        <h5>Status:<span style="color: #991414;"> Transfer Failed</span></h5>
                        <div classname="text-muted">Error</div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tempus, arcu eu pretium consequat, purus orci vulputate 
					</div>
				</div>
                <div classname="row">
                    <div classname="col-md-2 col-6">
                        <button type="button" classname="btn btn-block btn-sm text-white" style="background: #A48D6B;
                        ">Clear all &nbsp;<i classname="fa fa-refresh"></i></button>
                    </div>
                </div>
			</div>
		</section>
	</div>
      <aside classname="control-sidebar control-sidebar-dark"></aside>
  </div>
  );
}

export default MessageDetail;
