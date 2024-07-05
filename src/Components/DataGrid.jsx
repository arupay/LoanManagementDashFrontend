import React, { useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

function DataGrid({ loans, onRowClicked }) {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (loans) {
      setRowData(loans);
    }
  }, [loans]);

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
    };
  });

  const [colDefs, setColDefs] = useState([
    { field: "type", headerName: "Loan Type" },
    { field: "id", headerName: "ID" },
    { field: "rate", valueFormatter: (p) => p.value.toFixed(2) + "%" },
    {
      field: "amount",
      valueFormatter: (p) => "$" + p.value.toFixed(2).toLocaleString(),
    },
    { field: "term", headerName: "Term (Years)" },
    { field: "status" },
    { field: "originationDate" },
  ]);

  const gridOptions = {
    autoSizeStrategy: {
      type: "fitGridWidth",
    },
  };

  return (
    <div className="ag-theme-quartz-dark" style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        onRowClicked={(e) => onRowClicked(e.data)} // Pass the clicked row data to the handler
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20]}
        gridOptions={gridOptions}
      />
    </div>
  );
}

export default DataGrid;
