import React from "react";
import "./ViewPayment.css";

const ViewPayment = () => {
  
  const paymentHistory = [
    {
      paymentId: 12345,
      paymentDate: "30/11/2024",
      paperType: "A4",
      numberOfPages: 4,
      pricePerPage: 200, 
    },
    {
      paymentId: 12346,
      paymentDate: "30/11/2024",
      paperType: "A3",
      numberOfPages: 15,
      pricePerPage: 400, 
    },
  ];

  return (
    <div className="view-payment-container">
      <h2>Payment History</h2>
      <table className="payment-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Payment Date</th>
            <th>Paper Type</th>
            <th>Number of paper</th>
            <th>Price</th>
            <th>Total (VND)</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment) => {
            const total = payment.numberOfPages * payment.pricePerPage;
            return (
              <tr key={payment.paymentId}>
                <td>{payment.paymentId}</td>
                <td>{payment.paymentDate}</td>
                <td>{payment.paperType}</td>
                <td>{payment.numberOfPages}</td>
                <td>{payment.pricePerPage}</td>
                <td>{total.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPayment;
