import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';


const MessageDetails = ({items}) => {
  const {id}=useParams();
 
    const value=useSelector(state=>state.hiddenstate.hidden);
    const itemsData=items.filter((item)=>{
      return item.id===parseInt(id)
    })

    console.log(itemsData)
 
    const style1={
       margin:"90px auto",
       width:"90%",
    }

  return (
    <div className='message-container messages' style={!value?style1:null}>
      <p style={{margin:"8px 0px 0px 20px"}}>Message Detail</p>
      
      <div className='message-box1'>
        <span>
            <p>Date</p>
            <p className='message-status'>{itemsData[0].date}</p>
        </span>
        <span> 
            <p>Status</p>
            <p className='message-status'>{itemsData[0].status}</p>
            </span>
        
      </div>
      <div className='message-box'>
      <p>Message </p>
         <p className='message'>
         {itemsData[0].message}
         </p>
      </div>
      
      {
        itemsData[0].status==="Failed"?<div className='span-box'>
        <span>
          <p>Error Details</p>
          <p style={{width:"80%",color:"red",fontWeight:"400"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatibus alias aliquam inventore perspiciatis dolorum, pariatur nam magni nemo reprehenderit. </p>
        </span>
        </div>
        :
        null
      }
      

      <div className='button-box'>
      <button>PROCESS</button>
      <button>CLOSE</button>
      </div>
    </div>
  );
}

export default MessageDetails;
