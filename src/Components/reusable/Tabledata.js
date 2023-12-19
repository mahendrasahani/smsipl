
import React, { useState } from 'react';
import styled from 'styled-components';
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaArrowsRotate } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { deleteItems } from '../store/ItemsSlice';
import { Link } from 'react-router-dom';


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
font-size: 22px;
font-weight: 400;
line-height: 26px;
letter-spacing: 0em;
text-align: left;
color: rgba(112, 116, 120, 1);


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
  padding-top:22px;
  display:flex;
  gap:5px;
  @media (max-width: 1494px) {
    padding-top:26px;
  }
  @media (max-width: 1208px) {
    padding-top:40px;
  }

  @media (max-width: 1157px) {
    padding-top:28px;
  }
  @media (max-width: 961px) {
    padding-top:40px;
  }
  @media (max-width: 888px) {
    padding-top:55px;
  }
  @media (max-width: 804px) {
    padding-top:64px;
  }
  >button{
    color:white;
    background: rgba(116, 136, 249, 1);
    border-radius:5px;
    width:40px;
    height:40px;
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
    >a svg{
      text-decoration:none;
      color:white;
      font-size:22px;
      padding-top:3px;
    }
  }

}  
}
 `

 const style1={
  padding:"5px 20px",
  backgroundColor:"green"
 }

 const style2={
  padding:"5px 20px",
  backgroundColor:"red"
 }

const Tabledata = (props) => {
  const dispatch=useDispatch()

  return (
   <>
        <Tr>
        <td><p>{props.Sno}</p></td>
        <td><p>{props.date}</p></td>
        <td><p>{props.message}</p></td>
        <td><p style={(props.status==="Success")?style1:style2}>{props.status}</p></td>
        <td>
          <button><Link to={`messageDetails/${props.Sno}`}><GrView/></Link></button>
          <button><FaArrowsRotate/></button>
          <button onClick={()=>dispatch(deleteItems(props.Sno))}><MdDelete /></button>

          </td>
    
        </Tr>
       
   </>
  );
}

export default Tabledata;
