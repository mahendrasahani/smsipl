import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Apis from '../../Services/ApiServices/Apis';
import Loading from '../reusable/Loading';
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
        const data= await Apis.getMessageDetails('http://dpw1.afrilogitech.com/api',id,);
        console.log("message",data.data.bollist)
        setMessage(data?.data.bollist)
        setVessel(data.data.vessel)
      } catch (error) {
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
        const response=await Apis.ProcessMessage('http://dpw1.afrilogitech.com/api',id,itemsData[0]?.status_code)
        if(response){
          alert(response)
          window.location.href="/admin/dashboard"
        }
  }
  
 
 
    const style1={
       margin:"90px auto",
       width:"90%",
    }

  return (
    <div className='message-container messages' style={!value?style1:null}>
      <p style={{margin:"8px 0px 0px 20px"}}>Message Detail</p>
      
      {/* <div className='message-box1'>
        <span>
            <p>Date</p>
            <div className='message-status'><p >
              {message[0].row_created.slice(0,10)}
              12/10/2000
              </p></div>
        </span>
        <span> 
            <p>Status</p>
             <div className='message-status'><p >
              {message[0].status_code===6?"Success":"Failed"}
              Failed
              </p></div>
            </span>
        
      </div> */}
      {/* <div className='message-box'>
      <p>Message </p>
         <p className='message'>
        {message[0].message}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit et accusamus numquam ullam perspiciatis eaque recusandae dolor labore placeat nemo? Amet quibusdam sit vel cupiditate nulla, dicta possimus fuga laborum maxime, quas pariatur perferendis iusto, omnis consectetur! Reprehenderit rerum alias ipsa aut aperiam delectus dolores exercitationem similique doloribus, ad quis.
         </p>
      </div>
      
      
        <div className='span-box'>
        <span>
          <p>Error Details</p>
          <p  className='error'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatibus alias aliquam inventore perspiciatis dolorum, pariatur nam magni nemo reprehenderit. </p>
        </span>
        </div> */}

        {
          loading?<Loading/>:
          
          <div>
            
          {
            message.map((item)=>{
                return <Message item={item} key={item.bltype}/>
            })
          }
   
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
           ((itemsData[0]?.status_code)===2)?
           <div className='span-box'>
           <span>
             <p style={{display:"inline",borderBottom:"2px solid black"}}>Error Details</p>
             <p  className='error'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatibus alias aliquam inventore perspiciatis dolorum, pariatur nam magni nemo reprehenderit. </p>
           </span>
           </div>
           :
           <div className='span-box'>
            <span>
            <p style={{display:"inline",borderBottom:"2px solid black"}}>Success</p>
            <p  className='error' style={{color:"green"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatibus alias aliquam inventore perspiciatis dolorum, pariatur nam magni nemo reprehenderit. </p>
          </span>
          </div>
         }
          
   
         {     
         (itemsData[0]?.status_code===2)?
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
