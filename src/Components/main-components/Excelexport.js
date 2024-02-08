import React, { useEffect } from "react";

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
    <>
    {
      excelData.length>0 ?<button
      onClick={() => exportToExcel(fileName)}
      color="primary" 
      className="filter-btn"
    >
     ExcelSheet
    </button>:
    <button
    onClick={(e) =>handlebtn()}
    color="primary" 
    className="filter-btn"
  >
  Download
  </button>
    }
      
    </>
  );
};

export default ExportExcel;
