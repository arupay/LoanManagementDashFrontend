import React from "react";
import { Bar } from "react-chartjs-2";
import "./chartConfig";

const BarChart = ({ loans }) => {
  // Sort loans by amount in descending order
  const sortedLoans = [...loans].sort((a, b) => b.amount - a.amount);

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

  const data = {
    labels: sortedLoans.map((loan) => `${loan.id}`),
    datasets: [
      {
        label: "Loan Amounts",
        data: sortedLoans.map((loan) => loan.amount),
        backgroundColor: sortedLoans.map((loan) => getColor(loan.type)),
        hoverBackgroundColor: sortedLoans.map((loan) => getColor(loan.type)),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Loans By Amount",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const loan = sortedLoans[context.dataIndex];
            return `Amount: $${loan.amount}, Rate: ${loan.rate}%, Term: ${loan.term} months`;
          },
        },
      },
      datalabels: {
        display: true,
        align: "end",
        anchor: "end",
        formatter: (value) => `$${value}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", marginLeft: "100px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
