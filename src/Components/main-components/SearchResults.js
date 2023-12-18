import React, {useEffect, useState } from 'react';
import Table from '../reusable/CustomTable'
import { useSelector } from 'react-redux';




const SearchResults = () => {
  
  const date=new Date();
  const maindate=date.getFullYear()+"-"+date.getMonth()+"-" + date.getDate();
  
  const [statusvalue,setStatus]=useState('');
  const [startdate,setstartDate]=useState(maindate)
  const [enddate,setendDate]=useState(maindate)
  const value=useSelector(state=>state.hiddenstate.hidden);                      //use of redux state variable (hidden)
  const items=useSelector(state=>state.Items.items);   
  const [filteredItems, setFilteredItems] = useState([]);                         //array to store filtered items

 

const style1={
   margin:"90px auto",
   width:"90%",
}



useEffect(() => {

    const filtered = filterItemsByDateRange(items, startdate, enddate, statusvalue);
    setFilteredItems(filtered);

   
}, [statusvalue, startdate, enddate,items]);

const filterItemsByDateRange = (items, startDate, endDate, statusvalue) => {
  return items.filter(item => {
    const itemDateParts = item.date.split('-').reverse().join('-');
    const itemDate = new Date(itemDateParts);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const st = item.status.toLowerCase();
    const dateInRange = itemDate >= start && itemDate <= end;
    const statusMatches = statusvalue === '' || st === statusvalue.toLowerCase();

    return dateInRange && statusMatches;
  });
};


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
                <select name="SelectStatus" id="select" value={statusvalue} onChange={(e)=>setStatus(e.target.value)}>
                  <option value="" disabled hidden>Select Status</option>
                  <option value="Success">Success</option>
                  <option value="Failed">Failed</option>
                </select>
              </span>              
        </div>
      </div>
      <div className='table-box'>
        {
          filteredItems.length===0? <Table items={items}/>: <Table items={filteredItems}/>
        }
       
      </div>
    </div>
  );
}

export default SearchResults;


