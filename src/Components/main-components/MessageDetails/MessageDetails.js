import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Apis from '../../../Services/ApiServices/Apis';
import Loading from '../../reusable/Loading';
import { useSelector } from 'react-redux';
import Message from './Message';


const MessageDetails = ({items}) => {
  const {id}=useParams();
 
  const [message,setMessage]=useState([]);
  const [process,setProcess]=useState(false)
  const [vessel,setVessel]=useState({})
  const [loading,setLoading] =useState(true)
  const prevProcess = useRef(process);
  const value=useSelector(state=>state.hiddenstate.hidden); 

  const itemsData=items.filter((item)=>{
    return item.id===parseInt(id)
  })


  useEffect(()=>{  
    MessageInfo();
  },[])

  

    const MessageInfo=async()=>{
      try {
        setLoading(true);
        const data= await Apis.getMessageDetails('https://dpw1.afrilogitech.com/api',id);
        // console.log("message",data.data.bollist)
        setMessage(data?.data.bollist)
        setVessel(data.data.vessel)
        console.log("messagedetails",data)
      } catch (error) {
        setLoading(false);
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    
    }


    

    useEffect(() => {
      if (prevProcess.current !== process) {
        processMessage();
        prevProcess.current = process;
      }
    }, [process]);

    
  const processMessage=async()=>{
        const response=await Apis.ProcessMessage('https://dpw1.afrilogitech.com/api',id,itemsData[0]?.status_code)
        if(response){
          alert(response)
          window.location.href="/admin/dashboard"
        }

        else{
          alert("Error while showing data")
        }
  }
  
 
 
    const style1={
       margin:"90px auto",
       width:"90%",
    }

  return (
    <div className='message-container messages' style={!value?style1:null}>
      <p style={{margin:"8px 0px 20px 20px"}}>Message Detail</p>
      
        {
          loading?<Loading/>:
          
          <div>  
        
          <div style={{border:"2px solid black",padding:"10px",margin:"19px",width:"80%"}}>
           <h1 style={{borderBottom:"2px solid black",display:"inline"}}>Vessel Details</h1>
           <p>Vessel Name : {vessel.vesselName}</p>
           <p>Vessel MRN : {vessel.mrn}</p>
           <p>Approval Date : {vessel.approvalDate}</p>
           <p>Departure Port : {vessel.departurePortName} , {vessel.departurePortCode}</p>
           <p>Departure Date : {vessel.departureDate}</p>
           <p>Discharge Port : {vessel.dischargePortName} , {vessel.dischargePortCode}</p>
           <p>Terminal Details : {vessel.terminalName} , {vessel.terminalCode}</p>
           <p>Expect Arrival Date : {vessel.expectedArrivalDate}</p>
          </div>
          {
            message.map((item,i)=>{
                return <Message items={item} key={item.bolnbr} value={i} length={message.length}/>
                   
            })
          }
   
   
         { 
           ((itemsData[0]?.status_code)===2 ||((itemsData[0]?.status_code)===5) || ((itemsData[0]?.status_code)===7))?
           <div className='span-box'>
           <span>
             <p style={{width:"150px",borderBottom:"2px solid black"}}>Error Details</p>
             <p  className='error' style={{color:"red",display:"inline"}}>{itemsData[0]?.status_desc}</p>
           </span>
           </div>
           :
           <div className='span-box'>
            <span>
            <p style={{width:"100px",borderBottom:"2px solid black"}}>Success</p>
            <p  className='error' style={{color:"green",display:"inline"}}>{itemsData[0]?.status_desc}</p>
          </span>
          </div>
         }
          
   
         {     
         (itemsData[0]?.status_code===5 || itemsData[0]?.status_code===7)?                       
         
         //process button will only show when status_code is 5 or 7 ie. inset failed /Pushing Failed

         <div className='button-box'>
         <button onClick={() => setProcess(!process)}>PROCESS</button>
        <Link to={"/admin/dashboard"}> <button>CLOSE</button></Link>
         </div>
         :
         <div className='button-box'>
        <Link to={"/admin/dashboard"}> <button>CLOSE</button></Link>
         </div>
         }
   
           </div>
       
        }
       
      
    </div>
  );
}

export default MessageDetails;
