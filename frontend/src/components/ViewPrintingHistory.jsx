import React from "react";
import "../styles/ViewPrintingHistory.css";
import { useLocation } from "react-router-dom";

const ViewPrintingHistory = () => {

  const location = useLocation();
  const { printHistory } = location.state || { printHistory: [] };
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

  
  const dataToDisplay = printHistory.length > 0 ? printHistory : exampleData;

  return (
    <div className="view-printing-history">
      <h2 className="title">Printing History</h2>
      <table className="printing-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>File Size</th>
            <th>Number of Pages</th>
            <th>Printer ID</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
        {dataToDisplay.map((record, index) => (
            <tr key={index}>
              <td className="p-3">{record.file_name}</td>
              <td className="p-3">{formatFileSize(record.file_size)}</td>
              <td className="p-3">{record.numberOfPages}</td>
              <td className="p-3">{record.printerId}</td>
              <td className="p-3">{formatTimestamp(record.datetime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPrintingHistory;
