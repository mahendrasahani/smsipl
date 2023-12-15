
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

th{
  padding:0 30px;
  font-family: Public Sans;
font-weight: 600;
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
                <th><p>#</p></th>
                <th><p>Date</p></th>
                <th className='message'><p>Message</p></th>
                <th className='status'><p>Status</p></th>
                <th><p>Actions</p></th>
       
          </Tr>
       
       <Tabledata Sno={"1"} date={"12/12/2023"} message={"Lorem ipsum dolor sit amet consectetur, adipisicing"} status={"Success"}/>
     </table>
    </>
  );
}

export default Table;
