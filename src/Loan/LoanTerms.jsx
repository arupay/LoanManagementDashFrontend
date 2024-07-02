import React, { useEffect, useState } from "react";

const LoanTerms = ({ loans }) => {
  const [maxTerm, setMaxTerm] = useState(0);

  useEffect(() => {
    if (loans && loans.length > 0) {
      const maxLoanTerm = Math.max(...loans.map((loan) => loan.term));
      setMaxTerm(maxLoanTerm);
    }
  }, [loans]);

  const getColor = (type) => {
    switch (type) {
      case "Student Loan":
        return "#36A2EB";
      case "Mortgage Loan":
        return "#4CAF50";
      case "Personal Loan":
        return "#FF9800";
      default:
        return "#CCCCCC";
    }
  };

  function barPercent(term) {
    return (term / maxTerm) * 100 + "%";
  }

  return (
    <div>
      {loans[0] ? (
        <div className="bottom-column">
          <h5 style={{ textAlign: "center" }}>Loan Terms</h5>
          {loans.map((loan, index) => (
            <div key={loan.id} className="loan-container">
              <div>Loan ID: {loan.id}</div>
              <div className="w3-grey">
                <div
                  className="w3-container w3-center w3-padding"
                  style={{
                    width: barPercent(loan.term),
                    backgroundColor: getColor(loan.type),
                    marginBottom: "10px",
                  }}
                >
                  {loan.term} Years
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
};

export default LoanTerms;
