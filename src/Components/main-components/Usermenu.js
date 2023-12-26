import React, {useEffect, useState } from 'react';
import Table from '../reusable/CustomTable'
import { useSelector } from 'react-redux';
import Apis from '../../Services/ApiServices/Apis';
import axios from 'axios';




const Usermenu = () => {
  const [messages,setMessages]=useState([]);
  
  const date=new Date();
  const maindate=date.getFullYear()+"-"+date.getMonth()+"-" + date.getDate();
  
  const [statusvalue,setStatus]=useState('');
  const [startdate,setstartDate]=useState(maindate)
  const [enddate,setendDate]=useState(maindate)
  const value=useSelector(state=>state.hiddenstate.hidden);                      //use of redux state variable (hidden)
  // const items=useSelector(state=>state.Items.items);   
  const [filteredItems, setFilteredItems] = useState([]);                         //array to store filtered items
  const [loading, setLoading] = useState(false);
 

const style1={
   margin:"90px auto",
   width:"90%",
}



useEffect(() => {
  const token = localStorage.getItem('token');
  console.log(token)
  if(token)
    fetchMessage();

  else {
    window.location.href="/login"
  }


  const filtered = filterItemsByDateRange(messages, startdate, enddate, statusvalue);
    setFilteredItems(filtered);

}, [messages,startdate,enddate,statusvalue]);


const fetchMessage = async () => {
  // console.log(usertoken)
  // try {
  //   const response = await axios({
  //     method: 'get',
  //     url: 'http://dpw1.afrilogitech.com/api/IntMessageManager/GetMessageList',
  //     headers: {
  //       'Authorization': `Bearer ${usertoken}`,
  //       'accept': '*/*',
  //     }
  //   });

  //   if (response.status === 200) {
  //     console.log(response);
  //   } else {
  //     console.log(response.status);
  //   }
  // } catch (err) {
  //   console.log('Error:', err);
  // }

  const apiResponse=await Apis.GetMessageList('http://dpw1.afrilogitech.com/api');
  console.log(apiResponse)
};


  const filterItemsByDateRange = (items, startDate, endDate, statusvalue) => {
   return messages.filter(item => {
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
              
              <input type="date"  
              value={enddate} 
              onChange={(e)=>setendDate(e.target.value)}/>
              
              </span>
              
              <span>
                <p>Status</p>
                <select name="SelectStatus" id="select" value={statusvalue} onChange={(e)=>setStatus(e.target.value)}>
                  <option value="">Select Status</option>
                  <option value="Success">Success</option>
                  <option value="Failed">Failed</option>
                </select>
              </span>              
        </div>
      </div>
      <div className='table-box'>
        {
          filteredItems.length===0? <Table messages={messages}/>: <Table messages={filteredItems}/>
        }
       
      </div>
    </div>
  );
}

export default Usermenu;


