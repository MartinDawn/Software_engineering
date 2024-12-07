import React from "react";
import { useNavigate } from "react-router-dom";

const ViewPrintButton = ({ printHistory  }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/viewprint_manager", {
      state: { printHistory }
    });
  };

  return (
    <button onClick={handleClick}>
      View Print History
    </button>
  );
};

export default ViewPrintButton;