
import { defaults } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";

defaults.plugins.title.display = "true";

const GraphCard= ({ itemsData }) => {
  

  const [messagedetails, setmessagedetails] = useState({
    // detailsinserted: 0,
    // insertionfailed: 0,
    transfersuccessful: 0,
    transferfailed: 0,
    // rawdatarecieved:0,
    // validationfailed:0,
    // validationsuccessful:0,
  });

  useEffect(() => {
    setmessagedetails((prevState) => ({
      ...prevState,
      // detailsinserted: 0,
      // insertionfailed: 0,
      transfersuccessful: 0,
      transferfailed: 0,
      // rawdatarecieved:0,
      // validationfailed:0,
      // validationsuccessful:0,
    }));
  
    itemsData && itemsData.length>0 && (typeof itemsData!="string") &&
      itemsData?.forEach((itm) => {
        setmessagedetails((prevState) => {
          if (itm.status_code ===1) {
            return {
              ...prevState,
              transferfailed: prevState. transferfailed + 1,
            };
          }


          if (itm.status_code ===2) {
            return {
              ...prevState,
              transferfailed: prevState. transferfailed + 1,
            };
          }

          if (itm.status_code ===3) {
            return {
              ...prevState,
              transferfailed: prevState. transferfailed + 1,
            };
          }

          if (itm.status_code === 4) {
            return {
              ...prevState,
              transferfailed: prevState.transferfailed + 1,
            };
          }
  
          if (itm.status_code === 5) {
            return {
              ...prevState,
              transferfailed: prevState. transferfailed + 1,
            };
          }
  
          if (itm.status_code === 6) {
            return {
              ...prevState,
              transfersuccessful: prevState.transfersuccessful + 1,
            };
          }
  
          if (itm.status_code === 7) {
            return {
              ...prevState,
              transferfailed: prevState.transferfailed + 1,
            };
          }
  
          return prevState;
        });
      });
  }, [itemsData]);

 

  return (
    <div
      style={{
        padding: "1px 30px",
        borderRadius: "10px",
        height: "fit-content",
      }}
    >
      <div className="graph-card">
        {Array.isArray(itemsData) && (itemsData?.length>0) ? (
          <Pie
            data={{
              labels: [
              
                "Transfer Successful",
              
                "Transfer Failed",

              ],
              // "Raw Data Received",
              // "Validation Successful",
              // "Validation Failed",
              // "Details Inserted",
              // "Details Insertion Failed",
              datasets: [
                {
                  label: "No. of messages",
                  data: [
          
                    messagedetails.transfersuccessful,
                    messagedetails.transferfailed,
                  ],

                  // messagedetails.rawdatarecieved,
                  // messagedetails.validationsuccessful,
                  // messagedetails.validationfailed,
                  // messagedetails.detailsinserted,
                  // messagedetails.insertionfailed,

                  backgroundColor: [
                    "green",
                    // "orange",
                    "red",
                    // "blue",
                    // "purple",
                    // "#28a745",
                    // "red",
                    // "rgb(255, 180, 220)",
                  ],
                  hoverOffset: 4,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Message Information",
                },
              },

              responsive: true,
              maintainAspectRatio: false,
              width: 800,
              height: 800,
            }}
          />
        ) : (
          <Pie
            data={{
              labels: ["No data for given Time Span"],
              datasets: [
                {
                  label: "Default",
                  data: [100],
                  backgroundColor: ["red"],
                  hoverOffset: 4,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Message Information",
                },
              },

              responsive: true,
              maintainAspectRatio: false,
              width: 800,
              height: 800,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GraphCard;



