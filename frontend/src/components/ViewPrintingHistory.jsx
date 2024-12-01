import React from "react";
import "../styles/ViewPrintingHistory.css";

const ViewPrintingHistory = ({ printingData = [] }) => {
  
  const exampleData = [
    {
      printId: "12345",
      fileName: "btl 2.pdf",
      uploadTime: "14:15 - 30/11/2024",
      printTime: "14:20 - 30/11/2024",
      printerId: "05",
    },
    {
      printId: "12346",
      fileName: "phao.pdf",
      uploadTime: "14:50 - 30/11/2024",
      printTime: "15:12 - 30/11/2024",
      printerId: "03",
    },
  ];

  
  const dataToDisplay = printingData.length > 0 ? printingData : exampleData;

  return (
    <div className="view-printing-history">
      <h2 className="title">Printing History</h2>
      <table className="printing-table">
        <thead>
          <tr>
            <th>Print ID</th>
            <th>File name</th>
            <th>Upload Time</th>
            <th>Print Time</th>
            <th>Printer ID</th>
          </tr>
        </thead>
        <tbody>
          {dataToDisplay.map((item, index) => (
            <tr key={index}>
              <td>{item.printId}</td>
              <td>{item.fileName}</td>
              <td>{item.uploadTime}</td>
              <td>{item.printTime}</td>
              <td>{item.printerId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPrintingHistory;
