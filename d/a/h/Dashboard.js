import React, { useState } from "react";
import Table from "./TestTable";

function Dashboard() {
  // Define the initial data for the table
const data = {
  added: [
    { name: "John", value: 10, isSelected: false},
    { name: "Mary", value: 20, isSelected: true},
  ],
  deleted: [{ name: "Tom", value: 30, isSelected: true}],
  updated: [{ name: "Sarah", value: 40, isSelected: false}],
};

  return (
    <div className="App">
      <Table />
    </div>
  );
}

export default Dashboard;