import React from "react";
import "../styles/ManageActivity.css";
import ViewPaymentButton from "../app/buttons/ViewPaymentButton/ViewPay";
import ViewPrintButton from "../app/buttons/ViewPrintHistoryButton/ViewPrintButton";

const ManageActivity = ({ isBuyingEnabled }) => {
  const statusClass = isBuyingEnabled ? "status on" : "status off";
  const statusText = isBuyingEnabled ? "On" : "Off";

  return (
    <div className="manage-activity-container">
      <h2>Student Activity</h2>
      <div className="buying-status">
        <span>is able buying:</span>
        <span className={statusClass}>{statusText}</span>
      </div>

      <table className="activity-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Available Page</th>
            <th>Major</th>
            <th>Enroll Year</th>
            <th>Payment History</th>
            <th>Print History</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>Student</td>
            <td>40</td>
            <td>Computer Science</td>
            <td>2023</td>
            <td>
              <ViewPaymentButton />
            </td>
            <td>
              <ViewPrintButton />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane Smith</td>
            <td>Student</td>
            <td>35</td>
            <td>Physics</td>
            <td>2022</td>
            <td>
              <ViewPaymentButton />
            </td>
            <td>
              <ViewPrintButton />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageActivity;
