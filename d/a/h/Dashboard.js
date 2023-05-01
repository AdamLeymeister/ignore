import React, { useState } from "react";
import Table from "./TestTable";

function Dashboard() {
  // Define the initial data for the table
  const state = {
    initialTable: [
        { id: 1, name: "Person One", value: 10, },
        { id: 2, name: "Person Two", value: 20, },
    ]
    };

const selections = {
  tableOne: [
    { id: 3, name: "Person Three", value: 10},
    { id: 4, name: "Person Four", value: 20},
  ]
};

const buildTable = (initialTable, selections) => {
    // create an array of objects combining the initial table and the selections and adding property isAdded to items in the selections array
    const combinedTable = initialTable.map((item) => {
      const isAdded = selections.some((selection) => selection.id === item.id);
      return { ...item, isAdded };
    });
}

const [tableData, setTableData] = useState([]);

React.useEffect(() => {
    const combinedTable = buildTable(state.initialTable, selections.tableOne);
    setTableData(combinedTable);
    console.log("tableData",tableData)
  }, [state.initialTable, selections.tableOne]
);

  return (
    <div className="App">
      <Table />
    </div>
  );
}

export default Dashboard;