import React, { useEffect, useState } from "react";
import "./App.css";
import LoanDashboard from "./Loan/LoanDashboard";
import axios from "axios";
import BarChart from "./Chart/BarChart";

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
      <h2>Loan Management Dashboard</h2>
      <BarChart loans={loans} />
      <main>
        <div className="table-container">
          <LoanDashboard loans={loans} />
        </div>
      </main>
    </div>
  );
}

export default App;
