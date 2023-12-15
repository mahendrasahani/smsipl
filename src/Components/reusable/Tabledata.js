
import React from 'react';
import styled from 'styled-components';
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaArrowsRotate } from "react-icons/fa6";

const Tr=styled.tr`
  background:white;
  width:100%;
 border-bottom:4px solid rgba(237, 242, 247, 1);
 

:nth-child(4){
  text-align:center;
 
}

 
>td{
padding:0 30px;
font-family: Public Sans;
font-weight: 400;
line-height: 27px;
letter-spacing: 0em;
text-align: left;
font-size:16px;
&:nth-child(4){
  >p{
    background-color:green;
    border-radius:20px;
    color:white;
    @media (max-width: 1039px) {
      padding:5px;
    }
   
  }
 
}
 &:nth-child(5){
  padding-top:11px;
  display:flex;
  gap:5px;
  @media (max-width: 1039px) {
    padding-top:24px;
  }
  @media (max-width: 856px) {
    padding-top:37px;
  }
  @media (max-width: 805px) {
    padding-top:52px;
  }
  @media (max-width: 749px) {
    padding-top:64px;
  }
  >button{
    color:white;
    background: rgba(116, 136, 249, 1);
    border-radius:5px;
    width:36px;
    height:38px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    border:none;
    outline:none;
    box-shadow:none;
    >svg{
      font-size:22px;
    }
   
  }

}  

}
 `

const Tabledata = (props) => {

  return (
   <>
        <Tr>
        <td><p>{props.Sno}</p></td>
        <td><p>{props.date}</p></td>
        <td><p>{props.message}</p></td>
        <td><p>{props.status}</p></td>
        <td>
          <button><GrView/></button>
          <button><FaArrowsRotate/></button>
          <button><MdDelete /></button>

          </td>
    
        </Tr>
        <Tr>
        <td><p>{props.Sno}</p></td>
        <td><p>{props.date}</p></td>
        <td><p>{props.message}</p></td>
        <td><p>{props.status}</p></td>
        <td>
          <button><GrView/></button>
          <button><FaArrowsRotate/></button>
          <button><MdDelete /></button>

          </td>
    
        </Tr>
       
   </>
  );
}

export default Tabledata;
