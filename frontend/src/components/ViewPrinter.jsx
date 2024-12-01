import React from "react";
import "../styles/ViewPrinter.css";
import ViewPrinterHistoryButton from "../app/buttons/ViewPrinterHistoryButton/ViewPrinterHistoryButton";

const ViewPrinter = ({ printerData = [] }) => {
  
  const exampleData = [
    {
      printerId: "09",
      availableFileTypes: "Pdf, doc, pp",
      status: "Available",
      location: "Main Office",
    },
    {
      printerId: "05",
      availableFileTypes: "Pdf, doc",
      status: "Unavailable",
      location: "Main Office",
    },
  ];

  
  const dataToDisplay = printerData.length > 0 ? printerData : exampleData;

  return (
    <div className="view-printer">
      <h2 className="title">Manage Printer</h2>
      <table className="printer-table">
        <thead>
          <tr>
            <th>Printer ID</th>
            <th>Available file type</th>
            <th>Status</th>
            <th>Location</th>
            <th>Print History</th>
          </tr>
        </thead>
        <tbody>
          {dataToDisplay.map((printer, index) => (
            <tr key={index}>
              <td>{printer.printerId}</td>
              <td>{printer.availableFileTypes}</td>
              <td
                className={
                  printer.status === "Available"
                    ? "status-available"
                    : "status-unavailable"
                }
              >
                {printer.status}
              </td>
              <td>{printer.location}</td>
              <td>
                <ViewPrinterHistoryButton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPrinter;
