import React, { useRef, useEffect, useMemo } from "react";
import "tabulator-tables/dist/css/tabulator_midnight.min.css";
import { TabulatorFull as Tabulator } from "tabulator-tables";


// define the Table component
const Table = ({ tdata }) => {
// define the columns of the table
const columns = useMemo(
  () => [
    { title: "Name", field: "name" },
    { title: "Value", field: "value" },
    {
      title: "Actions",
      field: "",
      formatter: "tickCross",
      cellClick: (e, cell) => {
        // update the row data when the "Actions" cell is clicked
        const row = cell.getRow();
        const rowData = row.getData();
        if (rowData.added) {
          row.update({ added: !rowData?.added, deleted: !rowData?.deleted });
        } else if (rowData.deleted) {
          row.update({ added: !rowData?.added, deleted: !rowData.deleted });
        } else {
          row.update({ deleted: true });
        }
      },
    },
  ],
  []
);

// define a function that will be used to format the rows of the table
const rowFormatter = useMemo(
  () => (row) => {
    // get the data for the row
    const data = row.getData();

    // if the row is selected, add a class to highlight it
    if (data.isSelected) {
      row.getElement().classList.add("selected-row");
    } else {
      row.getElement().classList.remove("selected-row");
    }

    // set the background color based on the data
    if (data.added) {
      row.getElement().style.color = "green";
    }
    if (data.deleted) {
      row.getElement().style.color = "red";
    }
    if (data.updated) {
      row.getElement().style.color = "yellow";
    }
  },
  []
);

  // create a reference to the div that will contain the table
  const tableRef = useRef(null);

  // create the table when the component is mounted
  useEffect(() => {
    if (tdata.length > 0) {
      try {
        const table = new Tabulator(tableRef.current, {
          // set the data and columns of the table
          data: tdata,
          columns,
          // set the row formatter
          rowFormatter,
          // enable row selection
          selectable: true,
        });
        // clean up the table when the component is unmounted
        return () => table.destroy();
      } catch (e) {
        console.error("Error creating table:", e);
      }
    } else {
      console.log("none");
    }
  }, [tdata, columns, rowFormatter]);

  // render the div that will contain the table
  return <div key="table-container" ref={tableRef} />;
};

// export the Table component
export default Table;
