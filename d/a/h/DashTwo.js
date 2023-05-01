import React, { useState } from "react";
import Table from "./TestTable";

function Dashboard() {
  const [tableData, setTableData] = useState([]);

  // Define the initial data for the table
  const selections = {
  added: [
    { id: 3, name: "Person Three", value: 10},
    { id: 4, name: "Person Four", value: 20},
  ],
  deleted: [
    { id: 1, name: "Person Three", value: 10},
  ]
};
  const state = {
    initialTable: [
        { id: 1, name: "Person One", value: 10, },
        { id: 2, name: "Person Two", value: 20, },
    ]
    };

function combineArrays() {
  // Create a set of all the ids in the deleted array.
  const idSet = new Set(selections.deleted.map((item) => item.id));

  // Create a new array by mapping over the initialTable array.
  // For each item in the initialTable array, create a new object
  // with all of the item's properties, and set the deleted property
  // based on whether its id is in the idSet.
  const combined = state.initialTable.map((item) => ({
    ...item,
    deleted: idSet.has(item.id),
  }));

  // Loop over the added array, and for each item, push a new object
  // onto the combined array with the added property set to true.
  selections.added.forEach((item) => {
    combined.push({
      ...item,
      added: true,
    });
  });

  // Return the combined array with the added deleted and added properties.
  console.log(combined)
  setTableData(combined);
}
React.useEffect(() => {
  combineArrays();
},[])
  return (
    <div className="App">
      <Table tdata={tableData}/>
    </div>
  );
}

export default Dashboard;