import React, { useEffect } from "react";
import Vector from "./assests/Vector.png";

import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

const ExportExcel = ({ excelData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset-UTF-8";
  const fileExtension = ".xlsx";
  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };


  const handlebtn=()=>{
     alert("No data is there to be printed")
  }

  return (
    <div class="col-md-7 col-7">
    {
      excelData.length>0 ?<button
      onClick={() => exportToExcel(fileName)}
      color="primary" 
      className="filter-btn download-btn"
    >
    Download excel sheet &nbsp;<i class="fa fa-download"></i>
    </button>:
   
  
  <button type="button" onClick={(e) =>handlebtn()}
    color="primary" 
    className="btn btn-primary btn-block">Download excel sheet &nbsp;<i class="fa fa-download"></i></button>

    }
      
      </div>
  );
};

export default ExportExcel;
