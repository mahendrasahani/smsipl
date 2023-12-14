
import React from 'react';
import styled from 'styled-components';
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

const Tr=styled.tr`
  background:white;
  width:100%;
 border:2px solid rgba(237, 242, 247, 1);
 
 :nth-child(1){
  padding:10px;
  width:10%;
}
:nth-child(2){
  padding:10px;
  width:20%;
}

:nth-child(3){

  width:30%;
}

:nth-child(4){
  width:20%;
  background:green;
  border-radius:50px;
  height:20px;
  color:white;
  text-align:center;
}

// td{
//   font-family: Public Sans;
// font-size: 23px;
// font-weight: 400;
// line-height: 27px;
// letter-spacing: 0em;
// text-align: left;

// }

  .icons-box{
    display:flex;
    gap:5px;
  }  

  .icons{
    color:white;
    background: rgba(116, 136, 249, 1);
    border-radius:5px;
    padding:5px;
    font-size:25px;
    width:auto;
  }

 

 `

const Tabledata = (props) => {

  

  return (
   <>
        <Tr>
        <td>{props.Sno}</td>
        <td>{props.date}</td>
        <td>{props.message}</td>
        <td>{props.status}</td>
        <td className='icons-box'>
          <GrView className='icons'/>
          <MdDelete className='icons'/>

          </td>
    
        </Tr>
        <Tr>
        <td>{props.Sno}</td>
        <td>{props.date}</td>
        <td>{props.message}</td>
        <td>{props.status}</td>
        <td className='icons-box'>
          <GrView className='icons'/>
          <MdDelete className='icons'/>
          </td>
    
        </Tr>
       
   </>
  );
}

export default Tabledata;
