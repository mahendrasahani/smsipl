import React from 'react';
import { useSelector } from 'react-redux';


const MessageDetails = () => {
    const value=useSelector(state=>state.hiddenstate.hidden);
 
    const style1={
       margin:"120px auto",
    }


  return (
    <div className='message-container messages' style={!value?style1:null}>
      <p style={{marginLeft:"20px"}}>Message Detail</p>
      <div className='message-box1'>
        <span>
            <p>Date</p>
            <p className='message-status'>12/10/2023</p>
        </span>
        <span> 
            <p>Status</p>
            <p className='message-status'>Failed</p>
            </span>
        
      </div>
      <div className='message-box'>
      <p>Message </p>
      {/* <input type="text"/> */}
         <p className='message'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt dolores praesentium architecto, eligendi molestiae ipsum odio explicabo saepe sit aliquam!
         </p>
      </div>
      
      <div className='span-box'>
      <span>
        <p>Error Details</p>
        <p style={{width:"80%",color:"red",fontWeight:"400"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatibus alias aliquam inventore perspiciatis dolorum, pariatur nam magni nemo reprehenderit. </p>
      </span>
      </div>

      <div className='button-box'>
      <button>PROCESS</button>
      <button>CLOSE</button>
      </div>
    </div>
  );
}

export default MessageDetails;
