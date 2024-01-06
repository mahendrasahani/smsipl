import React from 'react';

const Message = ({item}) => {
  return (
    <div style={{border:"2px solid black",padding:"10px",margin:"19px",width:"80%"}}>
        <h1 style={{borderBottom:"2px solid black",display:"inline"}}>BolList</h1>
           <p>BlType : {item.bltype}</p>
           <p>CargoCode : {item.cargocode}</p>
           <p>Destination : {item.destinationplacename} , {item.destinationplacecode}</p>
           <p>Exporter Name : {item.exportername}</p>
           <p>Shipping Agent : {item.shippingagentname} , {item.shippingagentcode}</p>
           <p>Loading Port : {item.loadingportname} , {item.loadingportcode}</p>
    </div>
  );
}

export default Message;
