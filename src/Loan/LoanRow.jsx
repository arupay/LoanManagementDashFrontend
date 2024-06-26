import React from "react";

const LoanRow = ({ loan }) => {
  return (
    <tr>
      <td>{loan.id}</td>
      <td>{loan.rate} %</td>
      <td>{loan.term}</td> 
      <td>{loan.amount}</td>
    </tr>
  );
};

export default LoanRow;
