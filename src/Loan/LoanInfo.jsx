import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LoanInfo.css";
import {
  getColor,
  calculateTimePassedPercent,
  calculateEndDate,
} from "../utils/loanUtils";
import { formatDate } from "../utils/dateUtils";

const LoanInfo = ({ selectedLoan, closeModal }) => {
  const [totalPayment, setTotalPayment] = useState(null);
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  useEffect(() => {
    if (selectedLoan) {
      axios
        .get(`http://localhost:8080/api/loans/total/${selectedLoan.id}`)
        .then((response) => setTotalPayment(response.data))
        .catch((error) =>
          console.error("Error fetching total payment:", error)
        );

      axios
        .get(`http://localhost:8080/api/loans/monthly/${selectedLoan.id}`)
        .then((response) => setMonthlyPayment(response.data))
        .catch((error) =>
          console.error("Error fetching monthly payment:", error)
        );
    }
  }, [selectedLoan]);

  return (
    <div>
      {selectedLoan && (
        <div>
          <div className="loan-header">Loan Information</div>
          <div className="loan-container">
            <div className="loan-info-col">
              <div>
                <div className="h2 amount">
                  ${selectedLoan.amount.toLocaleString()}
                </div>
                <div className="small text-muted negmt">Loan Amount</div>
              </div>
              <div>
                <div className="h4">{selectedLoan.rate.toFixed(2)}%</div>
                <div className="small text-muted negmt">Interest Rate</div>
              </div>

              <div>
                <div
                  className="h6"
                  style={{ color: getColor(selectedLoan.type) }}
                >
                  {selectedLoan.type.split(" ")[0]}
                </div>
                <div className="small text-muted negmt">Loan Type</div>
              </div>
              <div>
                <div className="h6">{selectedLoan.id}</div>
                <div className="small text-muted negmt">Loan ID</div>
              </div>
            </div>
            <div className="loan-info-col">
              <div>
                <div
                  className="h6"
                  style={{
                    color:
                      selectedLoan.status === "Defaulted"
                        ? "crimson"
                        : "inherit",
                  }}
                >
                  {selectedLoan.status}
                </div>
                <div className="small text-muted negmt">Loan Status</div>
              </div>
              <div>
                <div className="h6">
                  {formatDate(selectedLoan.originationDate)}
                </div>
                <div className="small text-muted negmt">Origination Date</div>
              </div>
              <div>
                <div className="h6">${totalPayment?.toLocaleString()}</div>
                <div className="small text-muted negmt">
                  Total Repayment Amount
                </div>
              </div>
              <div>
                <div className="h6">${monthlyPayment?.toLocaleString()}</div>
                <div className="small text-muted negmt">Monthly Payment</div>
              </div>
            </div>
          </div>
          {selectedLoan.status !== "Paid Off" && (
            <>
              <div className="loan-progress-container">
                <div
                  className="loan-progress"
                  style={{
                    width: calculateTimePassedPercent(
                      selectedLoan.originationDate,
                      selectedLoan.term,
                      selectedLoan.status
                    ),
                  }}
                >
                  {calculateTimePassedPercent(
                    selectedLoan.originationDate,
                    selectedLoan.term,
                    selectedLoan.status
                  )}
                </div>
              </div>
              <div
                className="small text-muted"
                style={{ textAlign: "center", marginTop: "-10px" }}
              >
                Loan Term Progress (Expected End Date:{" "}
                <span className="fw-bold">
                  {calculateEndDate(
                    selectedLoan.originationDate,
                    selectedLoan.term
                  )}
                </span>
                )
              </div>
            </>
          )}
          <button onClick={closeModal} className="btn btn-warning close-btn">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default LoanInfo;
