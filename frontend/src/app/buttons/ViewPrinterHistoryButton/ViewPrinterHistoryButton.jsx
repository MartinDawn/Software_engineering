import React from "react";
import { useNavigate } from "react-router-dom";
import "./ViewPrinterHistoryButton.css";

const ViewPrinterHistoryButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="view-printer-history-button"
      onClick={() => navigate("/viewprinterhistory")}
    >
      View Print History
    </button>
  );
};

export default ViewPrinterHistoryButton;
