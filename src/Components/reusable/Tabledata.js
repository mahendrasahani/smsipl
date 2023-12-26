
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { deleteItems } from '../store/ItemsSlice';
import { Link } from 'react-router-dom';
import Viewsvg from "../assests/view.svg"
import Cycle from "../assests/cycle.svg"
import Delete from "../assests/delete.svg"

const Tr=styled.tr`
  background:white;
  width:100%;
 border-bottom:2px solid rgba(237, 242, 247, 1);
 

:nth-child(4){
  text-align:center;
 
}

 
>td{
padding:0 30px;
font-family: Public Sans;
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
  display:flex;
  gap:5px;

  >button{
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
    >a img{
      text-decoration:none;
      font-size:22px;
      padding-top:3px;
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
        <Tr className='table-inside'>
        <td><p>{props.Sno}</p></td>
        <td><p>{props.date}</p></td>
        <td><p>{props.message}</p></td>
        <td><p style={(props.status==="Success")?style1:style2}>{props.status}</p></td>
        <td>
          <button><Link to={`messageDetails/${props.Sno}`}> <img src={Viewsvg} alt="viewimg"/></Link></button>
          <button><Link><img src={Cycle} alt="Cycleimg"/></Link></button>
          <button onClick={()=>dispatch(deleteItems(props.Sno))}> <Link> <img src={Delete} alt="deleteimg"/></Link></button>

        </td>
    
        </Tr>
       
   </>
  );
}

export default Tabledata;
