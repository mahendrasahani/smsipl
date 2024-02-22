import React, {useEffect, useState } from "react";
import Table from "../reusable/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import Apis from "../../Services/ApiServices/Apis";
import { addItems } from "../store/ItemsSlice";
import Loading from "../reusable/Loading";
import Viewsvg from "../assests/view.svg"
import Cycle from "../assests/cycle.svg"



const SearchResults = () => {
  //present date
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const maindate = `${year}-${month}-${day}`;

  const [statusvalue, setStatus] = useState(0);
  const [startdate, setstartDate] = useState(maindate);
  const [enddate, setendDate] = useState(maindate);
  const value = useSelector((state) => state.hiddenstate.hidden); //use of redux state variable (hidden)
  // const items=useSelector(state=>state.Items.items);
  const [filteredItems, setFilteredItems] = useState([]); //array to store filtered items
  const [loading, setLoading] = useState(false);
  const [dateOption,setDateoption]=useState(0);
  const [number,setNumber]=useState(0);

  const items = useSelector((state) => state.Items.items);

  const dispatch = useDispatch();

  const style1 = {
    margin: "90px auto",
    width: "90%",
  };

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
      console.log(start,end)
      if(dateOption==1){
        fetchMessage(start,start, statusvalue);
      }
      else{
        fetchMessage(start,end, statusvalue);
      }
      
    } else {
      window.location.href = "/login";
    }
  }, [number]);

  const fetchMessage = async (start, end) => {
    try {
      setLoading(true);
      console.log("start",start)
      console.log("end",end)
      const apiResponse = await Apis.GetMessageList(
        "https://dpw1.afrilogitech.com/api",
        start,
        end,
        statusvalue
      );
      console.log("statusCode", apiResponse.data);

      dispatch(addItems(apiResponse?.data));
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };


  //------------------------------------------Format Date---------------------------------------------------------//

  const formatDateString = (date) => {
    return date.toLocaleDateString("en-US");
  };

  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split("/");
    const formattedDate = `${month.padStart(2, "0")}/${day.padStart(
      2,
      "0"
    )}/${year}`;
    return formattedDate;
  };

  //---------------------- Filter function to filter data using date and status----------------------------------//

  const FilterData = () => {
    setNumber((prev)=>prev+1)
  };

//---------------------------------------------------------------------------------------------------------------//
  //-------------------------------------------Reset Data----------------------------------------------------------//


  const ResetData = ()=>{
     setstartDate(maindate)
     setendDate(maindate)
     setStatus(0);
     FilterData(items)
     console.log("dateOption",dateOption)
  };


//---------------------------------------------------------------------------------------------------------------//



  return (
    <div className="main-container" style={!value ? style1 : null}>
      <div className="filter-part">
      <div className="searchbox">
        <h1>Search Results</h1>
        <div>
          <div className="span-box">

            <span>
            <p>Search By Date</p>
            <select
                name="SelectStatus"
                id="select"
                value={dateOption}
                onChange={(e) => setDateoption(e.target.value)}
              >
                <option value={0}>Select Range</option>
                <option value={1}>On</option>
                <option value={2}>Between</option>
              </select>
            </span>
                
                {
                  dateOption==1?<span className="date-input">
                  <p>Date</p>
                  <input
                    type="date"
                    value={startdate}
                    min="2023-01-01"
                    max={maindate}
                    onChange={(e) => setstartDate(e.target.value)}
                  />
                </span>
                :
                <div className="date-field">
                <span>
                <p>From Date</p>
                <input
                  type="date"
                  value={startdate}
                  min="2023-01-01"
                  max={maindate}
                  onChange={(e) => setstartDate(e.target.value)}
                />
              </span>
              <span>
              <p>To Date</p>

              <input
                type="date"
                min="2023-01-01"
                max={maindate}
                value={enddate}
                onChange={(e) => setendDate(e.target.value)}
              />
            </span>
              </div>
              }
            <span>
              <p>Status</p>
              <select
                name="SelectStatus"
                id="select"
                value={statusvalue}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={0}>Select All</option>
                <option value={4}>Details Inserted</option>
                <option value={6}>Transfer Successful</option>
                <option value={5}>Details Insertion Failed</option>
                <option value={7}>Transfer Failed</option>
              </select>
            </span>
            
          
          </div>
          <div className="btns">
            <button className="filter-btn" onClick={FilterData}>
              Search
            </button>

            <button className="filter-btn" onClick={ResetData}>Clear</button>
            </div>
        </div>
      </div>
     
      <div className="legends">
             <div className="color-legend">
              <p><span>Details Inserted </span><span></span></p>
              <p><span>Transfer Successful </span><span></span></p>
              <p><span>Details Insertion Failed </span><span></span></p>
              <p><span>Transfer Failed </span><span></span></p>
             </div>
             <div className="icon-legend">
             <p><span>View </span><span><img src={Viewsvg} alt="" /></span></p>
              <p><span>Reprocess</span><span><img src={Cycle} alt="" /></span></p>
        
             </div>
      </div>
      </div>
      

      {loading ? (
        <Loading />
      ) : filteredItems.length !== 0 ? (
        <div className="table-box">{<Table messages={filteredItems} />}</div>
      ) : items.length === 0 ? (
        <h1 style={{ textAlign: "center", height: "300px" }}>
          <hr
            style={{
              height: "40px",
              backgroundColor: "rgba(237, 242, 247, 1)",
              marginBottom: "40px",
              border:"none"
            }}
          ></hr>
          No data is found for specific date Filters......
        </h1>
      ) : (
        <div className="table-box">{<Table messages={items} />}</div>
      )}
    </div>
  );
};

export default SearchResults;
