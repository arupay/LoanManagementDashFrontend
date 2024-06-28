import React from "react";

const LoanTerms = ({ loans }) => {
  console.log(loans)
  let colors = ["green","orange","red","purple","yellow","blue"]
  function barPercent (term){return term / 20 * 100 + "%"};
  return (
<div>{loans[0] ? 
    <div className="bottom-column">
    <h5 style={{}}>Loan Terms</h5>
    {loans.map((loan, index) => (<div><p>Loan ID: {loan.id}</p>
    <div className="w3-grey">
      <div className="w3-container w3-center w3-padding" style={{width:barPercent(loan.term),backgroundColor:colors[index % 6]}}> {loan.term} Years</div>
    </div> </div>))}
  </div> : "loading"}
  </div> )
  
};

export default LoanTerms;
