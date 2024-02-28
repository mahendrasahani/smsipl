import React, { useEffect, useRef, useState } from "react";
import ExportExcel from "./Excelexport";
import { useSelector, useDispatch } from "react-redux";
import Apis from "../../Services/ApiServices/Apis";
import { addItems } from "../store/ItemsSlice";
import GraphCard from "./GraphCard";

const Exceldata = () => {
  const hidden = useSelector((state) => state.hiddenstate.hidden);
  const items = useSelector((state) => state.Items.items);
  const onRef = useRef();
  const betweenRef = useRef();

  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [statusValue, setStatusValue] = useState(0);
  const [dateOption, setDateOption] = useState(2);
  const [number, setNumber] = useState(0); // Define setNumber state

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const start = formatDate(startDate);
      const end = formatDate(endDate);
      fetchMessage(start, end);
    } else {
      window.location.href = "/login";
    }
  }, [startDate, endDate, statusValue, dateOption]);

  const fetchMessage = async (start, end) => {
    try {
      const apiResponse = await Apis.GetMessageList(
        "https://dpw1.afrilogitech.com/api",
        start,
        end,
        statusValue
      );
      dispatch(addItems(apiResponse?.data));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const filterData = () => {
    if (dateOption === "Y") {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 1);
      const formattedDate = date.toISOString().slice(0, 10);
      setStartDate(formattedDate);
    } else {
      setStartDate(new Date().toISOString().split("T")[0]); // Corrected maindate
    }
    setNumber((prev) => prev + 1);
    console.log("StartDate:", startDate);
    console.log("EndDate:", endDate);
    console.log("Number:", number);
  };

  useEffect(() => {
    const element1 = onRef.current;
    const element2 = betweenRef.current;
    element2.checked = true;

    const checkedStatus = () => {
      element1.checked = true;
      element2.checked = false;
    };

    element1.addEventListener("click", checkedStatus);

    const checkedStatus2 = () => {
      element1.checked = false;
      element2.checked = true;
    };

    element2.addEventListener("click", checkedStatus2);

    return () => {
      element1.removeEventListener("click", checkedStatus);
      element2.removeEventListener("click", checkedStatus2);
    };
  }, []);

  return (
    <div
      className={`message-container messages graphpage ${
        !hidden ? "style1" : ""
      }`}
    >
      <h1>Dashboard</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "50px" }}>
        <div className="filter-part" style={{ width: "50%" }}>
          <div className="searchbox">
            <h1>Download Excel Sheet</h1>

            <div>
            
              <div className="range-selector">
                <p>Select Range:</p>
                <p>
                  <input
                    type="radio"
                    id="on"
                    ref={onRef}
                    value={1}
                    onClick={(e) => setDateOption(e.target.value)}
                  />
                  <label htmlFor="on">On</label>
                </p>

                <p>
                  <input
                    type="radio"
                    id="between"
                    value={2}
                    ref={betweenRef}
                    onClick={(e) => setDateOption(e.target.value)}
                  />
                  <label htmlFor="between">Between</label>
                </p>
              </div>
            </div>
            <div style={{ marginBottom: "100px" }}>
              <div className="span-box1">
                {dateOption === "1" ? (
                  <div>
                    <p>Date</p>
                    <input
                      type="date"
                      value={startDate}
                      min="2023-01-01"
                      max={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <p>From Date</p>
                      <input
                        type="date"
                        value={startDate}
                        min="2023-01-01"
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <p>To Date</p>
                      <input
                        type="date"
                        min="2023-01-01"
                        max={new Date().toISOString().split("T")[0]}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </>
                )}
                <div>
                  <p>Status</p>
                  <select
                    className="select-box"
                    name="SelectStatus"
                    value={statusValue}
                    onChange={(e) => setStatusValue(e.target.value)}
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
                <button className="filter-btn" onClick={filterData}>
                  Clear
                </button>
                <ExportExcel excelData={items} fileName={"Excel Export"} />
              </div>
            </div>
          </div>
        </div>
        <GraphCard  itemsData={items}/>
      </div>
    </div>
  );
};

export default Exceldata;
