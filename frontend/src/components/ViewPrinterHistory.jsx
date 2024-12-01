import React from "react";
import "../styles/ViewPrinterHistory.css";

const ViewPrinterHistory = ({ historyData = [] }) => {
  
  const exampleHistory = [
    {
      userId: "042",
      fileName: "btl 2. pdf",
      printTime: "14:15 - 30/11/2024",
    },
    {
      userId: "146",
      fileName: "phao. pdf",
      printTime: "14:50 - 30/11/2024",
    },
  ];

  
  const dataToDisplay = historyData.length > 0 ? historyData : exampleHistory;

  return (
    <div className="view-printer-history">
      <h2 className="title">Printing History</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>File name</th>
            <th>Print Time</th>
          </tr>
        </thead>
        <tbody>
          {dataToDisplay.map((history, index) => (
            <tr key={index}>
              <td>{history.userId}</td>
              <td>{history.fileName}</td>
              <td>{history.printTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPrinterHistory;
