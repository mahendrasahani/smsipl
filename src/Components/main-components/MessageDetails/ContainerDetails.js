import React, { useEffect } from 'react';

const ContainerDetails = ({item,val,indexval, length}) => { 
    
    const {cntrnbr,cntrsize}=item;


const showContainerDetails=()=>{
  if(val==0){
    const data = document.getElementById(`inside-cntrs${val+indexval}`);
    const computedStyle = window.getComputedStyle(data);
    const displayProperty = computedStyle.getPropertyValue('display');
    
    if(displayProperty=="none"){
      data.style.display="block"
    }

    else{
      data.style.display="none"
    }
    
  }

  else{
    const data = document.getElementById(`inside-cntrs${val+indexval+length}`);
    const computedStyle = window.getComputedStyle(data);
    const displayProperty = computedStyle.getPropertyValue('display');
    
    if(displayProperty=="none"){
      data.style.display="block"
    }

    else{
      data.style.display="none"
    }
    
  }
  

 } 

return (
  <div className="message-card">
    <h1 onClick={() => showContainerDetails()}>
    bolcntrs {indexval + 1}{" "}
    </h1>
    {
      val===0?<div className="inside-cntrs" id={`inside-cntrs${val+indexval}`}>
      <p>Cntrnbr : {cntrnbr}</p>
      <p>Cntrsize : {cntrsize}</p>
    </div>:
      <div className="inside-cntrs" id={`inside-cntrs${val+indexval+length}`}>
        <p>Cntrnbr : {cntrnbr}</p>
      <p>Cntrsize : {cntrsize}</p>
    
     
    </div>
    }
    
  </div>
);
}

export default ContainerDetails;
