
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

const Table = ({items}) => {
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
       {
        items.map((item)=>{
          return <Tabledata Sno={item.id} date={item.date} message={item.message} status={item.status} key={item.id}/>
         
        })
       }
       
     </table>
    </>
  );
}

export default Table;
