import React, { useEffect, useState } from 'react';
import ExportExcel from './Excelexport';
import { useSelector,useDispatch } from 'react-redux';
import Apis from '../../Services/ApiServices/Apis';
import { addItems } from '../store/ItemsSlice';
import GraphCard from './GraphCard';

const Exceldata = () => {
    const value=useSelector(state=>state.hiddenstate.hidden); 
 
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const maindate = `${year}-${month}-${day}`;
  
    const [statusvalue, setStatus] = useState(0);
    const [startdate, setstartDate] = useState(maindate);
    const [enddate, setendDate] = useState(maindate);
    const [loading, setLoading] = useState(false);
    const [dateOption,setDateoption]=useState(0);
    const [number,setNumber]=useState(0);
    const [filteredItems, setFilteredItems] = useState([]);
  
    const items = useSelector((state) => state.Items.items);
  
    const dispatch = useDispatch();
  
 
  
    const formatDate2 = (dateString) => {
      const date = new Date(dateString);
      const formattedDate = `${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date
        .getDate()
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
      return formattedDate;
    };
  
  
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const start = formatDate2(startdate);
      
        const end = formatDate2(enddate);
        
        if(dateOption===+1){
          fetchMessage(start,start, statusvalue);
        }
        else{
          fetchMessage(start,end, statusvalue);
        }
        
      } else {
        window.location.href = "/login";
      }
    }, [number]);
  
    // --------------------------------Fetching data from getMessageList Api--------------------------------------//
  
    const fetchMessage = async (start, end) => {
      try {
        setLoading(true);
        const apiResponse = await Apis.GetMessageList(
          "http://dpw1.afrilogitech.com/api",
          start,
          end,
          statusvalue
        );
  
  
        dispatch(addItems(apiResponse?.data));
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
  
  
  
  
    //---------------------- Filter function to filter data using date and status----------------------------------//
  
    const FilterData = () => {
      setNumber((prev)=>prev+1)
    };
  

    const style1={
        margin:"90px auto",
        width:"90%",
     }

  return (
  <div className='message-container messages graphpage' style={!value?style1:null}>
      <h1>Dashboard</h1>
     <GraphCard/>
    <div className="filter-part">
       <div className="searchbox">
         <h1>Download Excel Sheet</h1>
         <div style={{marginBottom:"100px"}} >
         <div className="span-box1">

<div>
<p>Search By Date</p>
<select
    name="SelectStatus"
    className="select-box"
    id="select"
    value={dateOption}
    onChange={(e) => setDateoption(e.target.value)}
  >
    <option value={0}>Select Range</option>
    <option value={1}>On</option>
    <option value={2}>Between</option>
  </select>
</div>
    
    {
      dateOption==1?<div>
      <p>Date</p>
      <input
        type="date"
        value={startdate}
        min="2023-01-01"
        max={maindate}
        onChange={(e) => setstartDate(e.target.value)}
      />
    </div>
    :
    <>
    <div>
    <p>From Date</p>
    <input
      type="date"
      value={startdate}
      min="2023-01-01"
      max={maindate}
      onChange={(e) => setstartDate(e.target.value)}
    />
  </div>
  <div>
  <p>To Date</p>

  <input
    type="date"
    min="2023-01-01"
    max={maindate}
    value={enddate}
    onChange={(e) => setendDate(e.target.value)}
  />
</div>
  </>
  }
<div>
  <p>Status</p>
  <select
  className="select-box"
    name="SelectStatus"
    id="select1"
    value={statusvalue}
    onChange={(e) => setStatus(e.target.value)}
  >
    <option value={0}>Select All</option>
    <option value={4}>Details Inserted</option>
    <option value={6}>Transfer Successful</option>
    <option value={5}>Details Insertion Failed</option>
    <option value={7}>Transfer Failed</option>
  </select>
</div>


</div>
          <div className="btns">
            <button className="filter-btn" onClick={FilterData}>
             FilterData
            </button>

      
         <ExportExcel excelData={items} fileName={"Excel Export"}/>

  
            </div>
            </div>
        </div>
    </div>
</div>
  );
}

export default Exceldata;
