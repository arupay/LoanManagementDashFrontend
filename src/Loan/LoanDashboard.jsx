import React, { useState } from "react";
import axios from "axios";
import { FaGraduationCap, FaHome, FaUserTie } from "react-icons/fa"; // Importing example icons

const formatCurrency = (amount) => {
  return `$${parseFloat(amount)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};

const formatPercentage = (rate) => {
  return `${parseFloat(rate).toFixed(2)}%`;
};

const getIconForLoanType = (type) => {
  switch (type) {
    case "Student Loan":
      return <FaGraduationCap />;
    case "Mortgage Loan":
      return <FaHome />;
    case "Personal Loan":
      return <FaUserTie />;
    default:
      return null;
  }
};

const LoanDashboard = ({ loans }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState({});

  const handleRowClick = async (loanId) => {
    if (expandedRow === loanId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(loanId);
      if (!additionalInfo[loanId]) {
        try {
          const [monthlyResponse, totalResponse] = await Promise.all([
            axios.get(`http://localhost:8080/api/loans/monthly/${loanId}`),
            axios.get(`http://localhost:8080/api/loans/total/${loanId}`),
          ]);

          setAdditionalInfo((prevInfo) => ({
            ...prevInfo,
            [loanId]: {
              monthlyPayment: monthlyResponse.data,
              totalPayment: totalResponse.data,
            },
          }));
        } catch (error) {
          console.error("Error fetching additional loan info:", error);
        }
      }
    }
  };

  return (
    <div className="bottom-column">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Interest Rate</th>
            <th>Term Length (Years)</th>
            <th>Amount Total (USD)</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, index) => (
            <React.Fragment key={loan.id}>
              <tr
                onClick={() => handleRowClick(loan.id)}
                className={`${expandedRow === loan.id ? "expanded" : ""} ${
                  index % 2 === 0 ? "even" : "odd"
                }`}
              >
                <td>{loan.id}</td>
                <td>
                  {getIconForLoanType(loan.type)}{" "}
                  <span style={{ marginLeft: "5px" }}>
                    {loan.type.split(" ")[0]}
                  </span>
                </td>
                <td>{formatPercentage(loan.rate)}</td>
                <td>{loan.term}</td>
                <td>{formatCurrency(loan.amount)}</td>
              </tr>
              {expandedRow === loan.id && (
                <tr className="expanded-content">
                  <td colSpan="5">
                    <div>
                      <p>
                        <strong>Monthly Payment:</strong>{" "}
                        {additionalInfo[loan.id]?.monthlyPayment ||
                          "Loading..."}
                      </p>
                      <p>
                        <strong>Total Payment:</strong>{" "}
                        {additionalInfo[loan.id]?.totalPayment || "Loading..."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanDashboard;
