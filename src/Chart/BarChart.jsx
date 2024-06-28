import React from "react";
import { Bar } from "react-chartjs-2";
import "./chartConfig"; // Ensure this import is present to register ChartJS components

const BarChart = ({ loans }) => {
  const data = {
    labels: loans.map((loan) => `Loan ${loan.id}`),
    datasets: [
      {
        label: "Loan Amounts",
        data: loans.map((loan) => loan.amount),
        backgroundColor: loans.map((loan) => {
          if (loan.amount < 50000) return "#FF6384";
          if (loan.amount < 150000) return "#36A2EB";
          return "#FFCE56";
        }),
        hoverBackgroundColor: loans.map((loan) => {
          if (loan.amount < 50000) return "#FF6384";
          if (loan.amount < 150000) return "#36A2EB";
          return "#FFCE56";
        }),
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
        text: "Loan Amount Distribution",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const loan = loans[context.dataIndex];
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
    <div
      className="bottom-column"
      style={{ width: "600px", height: "400px" }}
    >
      <h3>Loan Amount Distribution</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
