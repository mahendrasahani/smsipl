import { defaults } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";

defaults.plugins.title.display = "true";

const GraphCard = ({ itemsData }) => {
  const [messagedetails, setmessagedetails] = useState({
    detailsinserted: 0,
    insertionfailed: 0,
    transfersuccessful: 0,
    transferfailed: 0,
  });

  useEffect(() => {
    setmessagedetails((prevState) => ({
      ...prevState,
      detailsinserted: 0,
      insertionfailed: 0,
      transfersuccessful: 0,
      transferfailed: 0,
    }));

    itemsData &&
      itemsData?.map((itm) => {
        if (itm.status_code === 2) {
          setmessagedetails((prevState) => ({
            ...prevState,
            detailsinserted: prevState.detailsinserted + 1,
          }));
        }

        if (itm.status_code === 5) {
          setmessagedetails((prevState) => ({
            ...prevState,
            insertionfailed: prevState.insertionfailed + 1,
          }));
        }

        if (itm.status_code === 6) {
          setmessagedetails((prevState) => ({
            ...prevState,
            transfersuccessful: prevState.transfersuccessful + 1,
          }));
        }

        if (itm.status_code === 7) {
          setmessagedetails((prevState) => ({
            ...prevState,
            transferfailed: prevState.transferfailed + 1,
          }));
        }
        return itm;
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
                "Details Inserted",
                "Transfer Successful",
                "Details Insertion Failed",
                "Transfer Failed",
              ],
              datasets: [
                {
                  label: "No. of messages ",
                  data: [
                    messagedetails.detailsinserted,
                    messagedetails.insertionfailed,
                    messagedetails.transfersuccessful,
                    messagedetails.transferfailed,
                  ],
                  backgroundColor: [
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

export default GraphCard;
