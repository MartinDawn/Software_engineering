import React from "react";
import { useNavigate } from "react-router-dom";

const ViewPaymentButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/viewpayment")}>
      View Payment
    </button>
  );
};

export default ViewPaymentButton;