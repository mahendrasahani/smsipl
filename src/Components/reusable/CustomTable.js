
import React from 'react';
import Tabledata from './Tabledata';
import styled from 'styled-components';

const Tr=styled.tr`
background: rgba(237, 242, 247, 1);
width:100%;
text-align:left;

.status{
  text-align:center;
}

:nth-child(1){
  width:10%;
}
:nth-child(2){
  width:20%;
}

:nth-child(3){
  width:30%;
}

:nth-child(4){
  width:20%;
}

:nth-child(5){
  width:20%;
}

th{
  font-family: Public Sans;
font-size: 23px;
font-weight: 400;
line-height: 27px;
letter-spacing: 0em;
text-align: left;

}
`

const Table = () => {
  return (
    <>
     <table className='table'>
          <Tr>
                <th>#</th>
                <th>Date</th>
                <th className='message'>Message</th>
                <th className='status'>Status</th>
                <th>Actions</th>
       
          </Tr>
       
       <Tabledata Sno={"1"} date={"12/12/2023"} message={"Lorem ipsum dolor sit amet consectetur, adipisicing"} status={"Success"}/>
     </table>
    </>
  );
}

export default Table;
