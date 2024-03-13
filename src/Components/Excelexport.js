import React, { useEffect } from "react";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

const ExportExcel = ({ excelData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset-UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel=()=>{
    const flatData = excelData?.map(item => ({
      id: item?.id,
      message: item?.message,
      status_code: item?.status_code,
      row_created: item?.row_created,
      manifest: JSON.stringify(item?.manifest),
      message: JSON.stringify(item?.message),
    }));

    const ws = XLSX.utils.json_to_sheet(flatData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  }

  const handlebtn = () => {
    alert("No data is there to be printed");
  };


  return (
    <div className="col-md-7 col-7">
      {excelData.length > 0 ? (
        <button
          onClick={() => exportToExcel(fileName)}
          title=" Download excel file"
          color="primary"
          className="btn btn-primary btn-block"
        >
          Download Excel Sheet &nbsp;<i class="fa fa-download"></i>
        </button>
      ) : (
        <button
          type="button"
          onClick={(e) => handlebtn()}
          color="primary"
          className="btn btn-primary btn-block"
          title=" Download excel file"
        >
          Download Excel Sheet &nbsp;<i class="fa fa-download"></i>
        </button>
      )}
    </div>
  );
};

export default ExportExcel;
