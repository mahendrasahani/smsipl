import React, { useCallback, useEffect, useState } from "react";
import Table from "../reusable/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import Apis from "../../Services/ApiServices/Apis";
import { addItems } from "../store/ItemsSlice";
import Loading from "../reusable/Loading";

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
      fetchMessage(start, end, statusvalue);
    } else {
      window.location.href = "/login";
    }
  }, [number]);

  // --------------------------------Fetching data from getMessageList Api--------------------------------------//

  const fetchMessage = async (start, end) => {
    try {
      setLoading(true);
      console.log("start",start)
      console.log("end",end)
      console.log("status",statusvalue)
      const apiResponse = await Apis.GetMessageList(
        "http://dpw1.afrilogitech.com/api",
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

    // if(items){
    //   const filtered = filterItemsByDateRange(
    //     items,
    //     startdate,
    //     enddate,
    //     statusvalue
    //   );
    //   setFilteredItems(filtered);
    // }

    // else{
    //   console.log("start",startdate)
    //   console.log("end",enddate)
    //   console.log("status",statusvalue)
    //   setFilteredItems(items)
    // }

    setNumber((prev)=>prev+1)
 
  };

  const filterItemsByDateRange = (items, startDate, endDate, statusvalue) => {
    return items?.filter((item) => {
      let itemDate = formatDateString(new Date(item.row_created));
      const itemStatus = item.status_code;
      itemDate = formatDate(itemDate);
      startDate = formatDate2(startDate);
      endDate = formatDate2(endDate);
      const dateInRange = itemDate >= startDate && itemDate <= endDate;
      const statusMatches = itemStatus == statusvalue;
      return dateInRange && statusMatches;
    });
  };

//---------------------------------------------------------------------------------------------------------------//
  //-------------------------------------------Reset Data----------------------------------------------------------//


  const ResetData = ()=>{
     setstartDate(maindate)
     setendDate(maindate)
     setStatus(0);
     FilterData(items)
  };


//---------------------------------------------------------------------------------------------------------------//



  return (
    <div className="main-container" style={!value ? style1 : null}>
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
                <option value={0}>Select All</option>
                <option value={1}>On</option>
                <option value={2}>Between</option>
              </select>
            </span>

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
            <button className="filter-btn" onClick={FilterData}>
              Search
            </button>

            <button className="filter-btn" onClick={ResetData}>Clear</button>
          </div>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : filteredItems.length !== 0 ? (
        <div className="table-box">{<Table messages={filteredItems} />}</div>
      ) : items.length === 0 ? (
        <h1 style={{ textAlign: "center", height: "300px" }}>
          <div
            style={{
              height: "50px",
              backgroundColor: "rgba(237, 242, 247, 1)",
              marginBottom: "40px",
            }}
          ></div>
          No data is found for specific date Filters......
        </h1>
      ) : (
        <div className="table-box">{<Table messages={items} />}</div>
      )}
    </div>
  );
};

export default SearchResults;
