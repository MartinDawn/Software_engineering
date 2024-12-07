import React from "react";
import { useNavigate } from "react-router-dom";
import "./ViewPrinterHistoryButton.css";

const ViewPrinterHistoryButton = ({ printerHistory }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(printerHistory);
    navigate("/viewprinterhistory", {
      state: { printerHistory }
    });
  };

  return (
    <button
      className="view-printer-history-button"
      onClick={handleClick}
    >
      View Print History
    </button>
  );
};

export default ViewPrinterHistoryButton;