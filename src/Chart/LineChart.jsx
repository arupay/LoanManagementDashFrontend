import React from "react";
import { Line } from "react-chartjs-2";
import "./chartConfig";

const LineChart = ({ loans }) => {
  const loansByYear = loans.reduce((acc, loan) => {
    const year = new Date(loan.originationDate).getFullYear();
    if (!acc[year])
      acc[year] = { "Student Loan": 0, "Mortgage Loan": 0, "Personal Loan": 0 };
    acc[year][loan.type] += 1;
    return acc;
  }, {});

  const years = Object.keys(loansByYear).sort((a, b) => a - b);

  const studentLoans = years.map((year) => loansByYear[year]["Student Loan"]);
  const mortgageLoans = years.map((year) => loansByYear[year]["Mortgage Loan"]);
  const personalLoans = years.map((year) => loansByYear[year]["Personal Loan"]);

  const data = {
    labels: years,
    datasets: [
      {
        label: "Student Loans",
        data: studentLoans,
        borderColor: "#36A2EB",
        fill: false,
      },
      {
        label: "Mortgage Loans",
        data: mortgageLoans,
        borderColor: "#4CAF50",
        fill: false,
      },
      {
        label: "Personal Loans",
        data: personalLoans,
        borderColor: "#FF9800",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Loan Type Trends by Year",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Loans",
        },
      },
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", marginLeft: "100px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
