
import React from 'react';
import styled from 'styled-components';
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

const Tr=styled.tr`
  background:white;
  width:100%;
 border:2px solid rgba(237, 242, 247, 1);
 

:nth-child(4){
  text-align:center;
 
}

 
td{
  font-family: Public Sans;
font-weight: 400;
line-height: 27px;
letter-spacing: 0em;
text-align: left;

}

   button{
    background-color:green;
    color:white;
    border:none;
    padding:10px;
    width:80px;
    border-radius:50px;
    cursor:pointer;
   }

  .icons-box{
    padding-top:18px;
    display:flex;
    gap:5px;
 
  }  

  .icons{
    color:white;
    background: rgba(116, 136, 249, 1);
    border-radius:5px;
    padding:5px;
    font-size:25px;
   
  }

 

 `

const Tabledata = (props) => {

  

  return (
   <>
        <Tr>
        <td><p>{props.Sno}</p></td>
        <td><p>{props.date}</p></td>
        <td><p>{props.message}</p></td>
        <td><p> <button>{props.status}</button></p></td>
        <td className='icons-box'>
          <GrView className='icons'/>
          <MdDelete className='icons'/>

          </td>
    
        </Tr>
        <Tr>
        <td><p>{props.Sno}</p></td>
        <td><p>{props.date}</p></td>
        <td><p>{props.message}</p></td>
        <td><p><button>{props.status}</button></p></td>
        <td className='icons-box'>
          <GrView className='icons'/>
          <MdDelete className='icons'/>
          </td>
    
        </Tr>
       
   </>
  );
}

export default Tabledata;
