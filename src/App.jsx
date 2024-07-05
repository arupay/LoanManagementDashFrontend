import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import LoanInfo from "./Loan/LoanInfo";
import PieChart from "./Chart/PieChart";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/NavBar";
import DataGrid from "./Components/DataGrid";
import LineChart from "./Chart/LineChart";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isLoanInfoModalOpen, setIsLoanInfoModalOpen] = useState(false);

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

  const openLoanInfoModal = (loan) => {
    setSelectedLoan(loan);
    setIsLoanInfoModalOpen(true);
  };

  const closeLoanInfoModal = () => {
    setIsLoanInfoModalOpen(false);
    setSelectedLoan(null);
  };

  const modalStyles = {
    overlay: {
      position: "fixed",
      zIndex: 1020,
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(50, 50, 50, .9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      background: "white",
      width: "50rem",
      maxWidth: "calc(100vw - 20px)",
      maxHeight: "calc(100vh - 20px)",
      overflowY: "auto",
      position: "relative",
      border: "1px solid #ccc",
      borderRadius: "1rem",
    },
  };

  return (
    <div className="App">
      <NavBar />
      <div className="row justify-content-center align-items-center d-flex p-3">
        <div className="col-md-6 d-flex justify-content-center">
          <LineChart loans={loans} />
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <PieChart loans={loans} />
        </div>
      </div>
      <div className="container">
        <DataGrid loans={loans} onRowClicked={openLoanInfoModal} />
      </div>
      <Modal
        isOpen={isLoanInfoModalOpen}
        onRequestClose={closeLoanInfoModal}
        style={modalStyles}
        className={`shadow p-4`}
      >
        {selectedLoan && (
          <LoanInfo
            selectedLoan={selectedLoan}
            closeModal={closeLoanInfoModal}
          />
        )}
      </Modal>
    </div>
  );
}

export default App;
