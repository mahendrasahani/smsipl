
import {defaults } from "chart.js/auto";
import {Pie} from "react-chartjs-2";
import Apis from "../../Services/ApiServices/Apis";
import { useEffect, useState } from "react";


defaults.plugins.title.display="true";

const GraphCard = () => {
    
   //present date
   const date = new Date();
   const year = date.getFullYear();
   const month = (date.getMonth() + 1).toString().padStart(2, "0");
   const day = date.getDate().toString().padStart(2, "0");
   const maindate = `${year}-${month}-${day}`;

   const [statusvalue, setStatus] = useState(0);
   const [startdate, setstartDate] = useState(maindate);
   const [enddate,setendDate]=useState(maindate);

   const [number,setNumber]=useState(0);
 
  const [data,setdata]=useState(null)

  const [messagedetails,setmessagedetails]=useState({
    detailsinserted:0,
    insertionfailed:0,
    transfersuccessful:0,
    transferfailed:0,
})


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
     
         fetchMessage(start,end, statusvalue);
       
       
     } else {
       window.location.href = "/login";
     }
   },[number]);
 
   // --------------------------------Fetching data from getMessageList Api--------------------------------------//
 
   const fetchMessage = async (start, end) => {
     try {
       const apiResponse = await Apis.GetMessageList(
         "https://dpw1.afrilogitech.com/api",
         start,
         end,
         statusvalue
       );
        setdata(apiResponse?.data);
      
     } catch (error) {
       console.error("Error fetching messages:", error);
     } 
   };

  //  ---------------------------Change of messagedetails keys corresponding values---------------------------------------------//

   useEffect(() => {

    setmessagedetails((prevState) => ({
      ...prevState,
      detailsinserted:0,
      insertionfailed:0,
      transfersuccessful:0,
      transferfailed:0,
    }));
    
    data && data?.map((itm) => {
      if (itm.status_code === 2) {
        setmessagedetails((prevState) => ({
          ...prevState,
          detailsinserted: prevState.detailsinserted + 1,
        }));
      }
  
      if (itm.status_code === 6) {
        setmessagedetails((prevState) => ({
          ...prevState,
          insertionfailed: prevState.insertionfailed + 1,
        }));
      }
  
      if (itm.status_code === 7) {
        setmessagedetails((prevState) => ({
          ...prevState,
          transfersuccessful: prevState.transfersuccessful + 1,
        }));
      }
  
      if (itm.status_code === 9) {
        setmessagedetails((prevState) => ({
          ...prevState,
          transferfailed: prevState.transferfailed + 1,
        }));
      }
        return itm;
    });

  }, [data]);
 
 
 
 
   //---------------------- Filter function to filter data using date and status----------------------------------//
 
   const FilterData =async (prop) => {
    
    if(prop==="M"){
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    date.toISOString().slice(0, 10);
    setstartDate(date);
    }
    else if(prop==="Y"){
      const date = new Date();
      
    date.setFullYear(date.getFullYear() - 1);
    date.toISOString().slice(0, 10);
    setstartDate(date);
   
    }

     else
      setstartDate(maindate);

  
     setNumber((prev)=>prev+1)
   
   };
 


  return (
    <div style={{borderBottom:"50px solid rgba(237, 242, 247, 1)"}}>
         <div className="graph-card">
          {
            data? <Pie
            data = {{
             labels: [
               'Details Inserted',
               'Transfer Successful',
               'Details Insertion failed',
                'Transfer failed'
             ],
             datasets: [{
               label: 'No. of messages ',
               data: [messagedetails.detailsinserted,messagedetails.insertionfailed,messagedetails.transfersuccessful,messagedetails.transferfailed],
               backgroundColor: [
                 'rgb(255, 99, 132)',
                 'rgb(54, 162, 235)',
                 'rgb(255, 205, 86)',
                  'rgb(255, 120, 240)',
                  'rgb(255, 180, 220)'
               ],
               hoverOffset: 4
             }]
           }}
     
            options={{
             plugins:{
                 title:{
                     text:"Message Information"
                 }
             },
             
               responsive:true, 
               maintainAspectRatio: false,
               width: 800,
               height: 800 
           
            }}
            />:
            <Pie
            data = {{
              labels: [
                "No data for given Time Span"
              ],
              datasets: [{
                label: 'Default',
                data: [100],
                backgroundColor: [
                  'rgb(255, 99, 132)',
                ],
                hoverOffset: 4
              }]
            }}
      
             options={{
              plugins:{
                  title:{
                      text:"Message Information"
                  }
              },
              
                responsive:true, 
                maintainAspectRatio: false,
                width: 800,
                height: 800 
            
             }}
            />
          }
     
       <div className="graph-btns">
        <button onClick={()=>FilterData("")}>1D</button>
        <button onClick={()=>FilterData("M")}>1M</button>
        <button onClick={()=>FilterData("Y")}>1Y</button>
    </div>
    </div>
    </div>
    
  );
}

export default GraphCard;
