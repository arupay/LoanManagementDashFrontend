import React, { useEffect, useState } from "react";
import "./App.css";
import LoanDashboard from "./Loan/LoanDashboard";
import axios from "axios";
import BarChart from "./Chart/BarChart";
import LoanTerms from "./Loan/LoanTerms";
import PieChart from "./Chart/PieChart";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/NavBar";

function App() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/loans")
      .then((response) => {
        setLoans(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the loans!", error);
      });
  }, []);

  return (
    <div className="App">
      <NavBar />
      <div className="row justify-content-center align-items-center d-flex p-3">
        <div className="col-md-6 d-flex justify-content-center">
          <BarChart loans={loans} />
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <PieChart loans={loans} />
        </div>
      </div>
      <div className="container">
        <div className="table-container">
          <LoanDashboard loans={loans} />
        </div>
        <div className="table-container">
          <LoanTerms loans={loans} />
        </div>
      </div>
    </div>
  );
}

export default App;
