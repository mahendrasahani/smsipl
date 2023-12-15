import React, { useEffect, useState } from 'react';
import Table from '../reusable/CustomTable'
import { useSelector } from 'react-redux';



const SearchResults = () => {

  const [startdate,setstartDate]=useState('2023-12-15')
  const [enddate,setendDate]=useState('2023-12-15')
  const value=useSelector(state=>state.hiddenstate.hidden);                      //use of redux state variable (hidden)
 
  
const style1={
   margin:"90px auto",
   width:"90%",
}


  return (
    <div className='main-container' style={!value?style1:null}>
                                                                              
      <div className='searchbox'>                             
        <h1>Search Results</h1>
        <div className='span-box'>
            <span>
              <p>From Date</p>
              <input type="date" value={startdate} onChange={(e)=>setstartDate(e.target.value)}/>
              </span>
            <span>
              <p>To Date</p>
              <input type="date"  value={enddate} onChange={(e)=>setendDate(e.target.value)}/>
              </span>
              <span>
                <p>Status</p>
                <select name="SelectStatus" id="select">
                  <option value="" selected disabled hidden>Select Status</option>
                  <option value="Success">Success</option>
                  <option value="Failed">Failed</option>
                </select>
              </span>              
        </div>
      </div>
      <div className='table-box'>
        <Table/>
      </div>
    </div>
  );
}

export default SearchResults;


