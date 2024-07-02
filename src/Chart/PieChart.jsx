// src/Chart/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import "./chartConfig"; // Ensure this import is present to register ChartJS components

const PieChart = ({ loans }) => {
  const studentLoansAmount = loans
    .filter((loan) => loan.type === "Student Loan")
    .reduce((sum, loan) => sum + loan.amount, 0);
  const mortgageLoansAmount = loans
    .filter((loan) => loan.type === "Mortgage Loan")
    .reduce((sum, loan) => sum + loan.amount, 0);
  const personalLoansAmount = loans
    .filter((loan) => loan.type === "Personal Loan")
    .reduce((sum, loan) => sum + loan.amount, 0);

  const data = {
    labels: ["Student Loans", "Mortgage Loans", "Personal Loans"],
    datasets: [
      {
        data: [studentLoansAmount, mortgageLoansAmount, personalLoansAmount],
        backgroundColor: ["#36A2EB", "#4CAF50", "#FF9800"],
        hoverBackgroundColor: ["#36A2EB", "#4CAF50", "#FF9800"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      title: {
        display: true,
        text: "Loan Amount Distribution By Type",
      },
    },
  };

  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
