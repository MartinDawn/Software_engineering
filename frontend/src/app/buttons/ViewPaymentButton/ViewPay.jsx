import React from "react";
import { useNavigate } from "react-router-dom";

const ViewPaymentButton = ({ paymentHistory }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/viewpayment", {
      state: { paymentHistory }
    });
  };

  return (
    <button onClick={handleClick}>
      View Payment
    </button>
  );
};

export default ViewPaymentButton;