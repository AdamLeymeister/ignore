import React, { useRef, useEffect } from "react";
import "tabulator-tables/dist/css/tabulator_midnight.min.css";
import { TabulatorFull as Tabulator } from "tabulator-tables";

const apiResponse = {
  added: [
    { name: "John", value: 10, isSelected: false, added: true },
    { name: "Mary", value: 20, isSelected: true, added: true },
  ],
  deleted: [{ name: "Tom", value: 30, isSelected: true, deleted: true }],
  updated: [{ name: "Sarah", value: 40, isSelected: false, updated: true }],
};

const columns = [
  { title: "Name", field: "name" },
  { title: "Value", field: "value" },
  {
    title: "Is Selected",
    field: "isSelected",
    formatter: "tickCross",
    cellClick: (e, cell) => {
      const row = cell.getRow();
      const rowData = row.getData();
      row.update({ isSelected: !rowData.isSelected });
    },
  },
];

const rowFormatter = (row) => {
  const data = row.getData();
  if (data.isSelected) {
    row.getElement().classList.add("selected-row");
  } else {
    row.getElement().classList.remove("selected-row");
  }
  if (data.added) {
    row.getElement().style.backgroundColor = "green";
  }
  if (data.deleted) {
    row.getElement().style.backgroundColor = "red";
  }
  if (data.updated) {
    row.getElement().style.backgroundColor = "yellow";
  }
};

const Table = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    const table = new Tabulator(tableRef.current, {
      data: apiResponse.added.concat(apiResponse.deleted, apiResponse.updated),
      columns,
      rowFormatter,
    });
    return () => table.destroy();
  }, []);

  return <div ref={tableRef} />;
};

export default Table;