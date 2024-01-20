import React, { useEffect } from 'react';

const CargoDetails = ({item,val,indexval, length}) => {
    const {markandnbr,cargotypecode,description}=item;


    // const showCargoDetails = (index) => {
    //   for (let i = 1; i <= length; i++) {
    //     const data = document.getElementById(`inside-cargo${i}`);
    //     const computedStyle = window.getComputedStyle(data);
    //     const isHidden = computedStyle.getPropertyValue("display") === "none";
    //     data.style.display = i === index && isHidden ? "block" : "none";
     
    //   }


       const showCargoDetails=()=>{
        if(val==0){
          const data = document.getElementById(`inside-cargo${val+indexval}`);
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
          const data = document.getElementById(`inside-cargo${val+indexval+length}`);
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
        Bolcargos {indexval + 1}{" "}
        </h1>
        {
         (val===0)?<div className="inside-cargo" id={`inside-cargo${val+indexval}`}>
          <p>Markandnbr : {markandnbr}</p>
          <p>Cargotypecode : {cargotypecode}</p>
          <p>description : {description}</p>
         
        </div>:
          <div className="inside-cargo" id={`inside-cargo${val+indexval+length}`}>
          <p>Markandnbr : {markandnbr}</p>
          <p>Cargotypecode : {cargotypecode}</p>
          <p>description : {description}</p>
         
        </div>
        }
        
      </div>
    );
}

export default CargoDetails;
