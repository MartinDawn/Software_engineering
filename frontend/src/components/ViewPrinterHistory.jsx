import React from "react";
import "../styles/ViewPrinterHistory.css";
import { useLocation } from "react-router-dom";

const ViewPrinterHistory = () => {
  const location = useLocation();
  const { printerHistory } = location.state || { printerHistory: [] };

  console.log(printerHistory); // Ensure this logs the correct data

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
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

  
  const dataToDisplay = printerHistory.length > 0 ? printerHistory : exampleHistory;

  return (
    <div className="view-printer-history">
      <h2 className="title">Printing History</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>File name</th>
            <th>Number of Pages</th>
            <th>Print Time</th>
          </tr>
        </thead>
        <tbody>
          {dataToDisplay.map((history, index) => (
            <tr key={index}>
              <td>{history.owner_id}</td>
              <td>{history.file_name}</td>
              <td>{history.numberOfPages}</td>
              <td>{formatTimestamp(history.datetime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPrinterHistory;
