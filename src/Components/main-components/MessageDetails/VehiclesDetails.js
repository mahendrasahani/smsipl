import React, { useEffect } from 'react';

const VehicleDetails = ({item,val,indexval, length}) => {
    const {enginenbr,vehicleid,casenbr}=item;

    
       const showCargoDetails=()=>{
        if(val==0){
          const data = document.getElementById(`inside-vehicle${val+indexval}`);
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
          const data = document.getElementById(`inside-vehicle${val+indexval+length}`);
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
      <div className="cargo-card">
        <h1 onClick={() => showCargoDetails()}>
        BolVehicles {indexval + 1}{" "}
        </h1>
        {
         (val===0)?<div className="inside-vehicle" id={`inside-vehicle${val+indexval}`}>
              <p>casenbr : {casenbr}</p>
          <p>vehicleid : {vehicleid}</p>
          <p>Enginenbr : {enginenbr}</p>
        
         
        </div>:
          <div className="inside-vehicle" id={`inside-vehicle${val+indexval+length}`}>
            <p>casenbr : {casenbr}</p>
          <p>vehicleid : {vehicleid}</p>
          <p>Enginenbr : {enginenbr}</p>
          
         
        </div>
        }
        
      </div>
    );
}

export default VehicleDetails;
