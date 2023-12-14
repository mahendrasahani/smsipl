import React from 'react';
import Table from './reusable/CustomTable'
import { useSelector } from 'react-redux';



const SearchResults = () => {
  const value=useSelector(state=>state.hiddenstate.hidden);
 
const style1={
   margin:"120px auto",
}

  return (
    <div className='main-container' style={!value?style1:null}>
                                                                              
      <div className='searchbox'>                             
        <h1>Search Results</h1>
        <div className='span-box'>
            <span>
              <p>From Date</p>
              <input type="date"/>
              </span>
            <span>
              <p>To Date</p>
              <input type="date" />
              </span>
            <span>
              <p>Status</p>
              <select name="Select Status" id="select">
                <option value="none" selected disabled hidden>Select Status</option>
              <option value="Status">Success</option>
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


