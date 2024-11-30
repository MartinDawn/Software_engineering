import React from "react";
import { useNavigate } from "react-router-dom";

const ViewPrintButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/viewprint_manager")}>
      View Print History
    </button>
  );
};

export default ViewPrintButton;