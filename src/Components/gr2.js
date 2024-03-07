
import { defaults } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";

defaults.plugins.title.display = "true";

const Gr2= ({ itemsData }) => {

 

  const [messagedetails, setmessagedetails] = useState({
    detailsinserted: 0,
    insertionfailed: 0,
    transfersuccessful: 0,
    transferfailed: 0,
    rawdatarecieved:0,
    validationfailed:0,
    validationsuccessful:0,
  });

  useEffect(() => {
    setmessagedetails((prevState) => ({
      ...prevState,
      detailsinserted: 0,
      insertionfailed: 0,
      transfersuccessful: 0,
      transferfailed: 0,
      rawdatarecieved:0,
      validationfailed:0,
      validationsuccessful:0,
    }));
  
    itemsData && itemsData.length>0 &&
      itemsData?.forEach((itm) => {
        setmessagedetails((prevState) => {
          if (itm.status_code ===1) {
            return {
              ...prevState,
             rawdatarecieved: prevState.rawdatarecieved + 1,
            };
          }


          if (itm.status_code ===2) {
            return {
              ...prevState,
             validationfailed: prevState.validationfailed + 1,
            };
          }

          if (itm.status_code ===3) {
            return {
              ...prevState,
             validationsuccessful: prevState.validationsuccessful + 1,
            };
          }

          if (itm.status_code === 4) {
            return {
              ...prevState,
              detailsinserted: prevState.detailsinserted + 1,
            };
          }
  
          if (itm.status_code === 5) {
            return {
              ...prevState,
              insertionfailed: prevState.insertionfailed + 1,
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
        {itemsData ? (
          <Pie
            data={{
              labels: [
                "Raw Data Received",
                "Validation Successful",
                "Validation Failed",
                "Details Inserted",
                "Transfer Successful",
                "Details Insertion Failed",
                "Transfer Failed",

              ],
              datasets: [
                {
                  label: "No. of messages",
                  data: [
                    messagedetails.detailsinserted,
                    messagedetails.insertionfailed,
                    messagedetails.transfersuccessful,
                    messagedetails.transferfailed,
                  ],
                  backgroundColor: [
                    "grey",
                    "orange",
                    "green",
                    "blue",
                    "purple",
                    "#28a745",
                    "red",
                    "rgb(255, 180, 220)",
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
                  backgroundColor: ["rgb(255, 99, 132)"],
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

export default Gr2;



