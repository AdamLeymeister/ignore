import React, { useRef, useEffect, useMemo, useState } from "react";
import "tabulator-tables/dist/css/tabulator_midnight.min.css";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

// define the Table component
const Table = ({ tdata }) => {
  const tableRef = useRef(null);
  const tableInstanceRef = useRef(null); // to store the table instance
 
  const [tableData, setTableData] = useState([]);
  const [contextMenu, setContextMenu] = useState({anchorPosition: null});
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {
    setTableData(tdata);
  }, [tdata]);

  // define the columns of the table
  const columns = useMemo(
    () => [
    { title: "Name", field: "name" },
    { title: "Value", field: "value" },
    {
      title: "Actions",
      field: "added",
    formatter: (cell, formatterParams, onRendered) => {
      const rowData = cell.getRow().getData();
      if (rowData.added) {
        return "added";
      } else if (rowData.deleted) {
        return "deleted";
      } else {
        return "";
      }
    },
      cellClick: (e, cell) => {
        // update the row data when the "Actions" cell is clicked
        const row = cell.getRow();
        const rowData = row.getData();
        if (rowData.added) {
          row.update({ added: !rowData?.added, deleted: !rowData?.deleted });
        } else if (rowData.deleted) {
          row.update({ added: !rowData?.added, deleted: !rowData.deleted });
        } else {
          row.update({ deleted: true, added: false });
        }
      },
    },

 {
        title: "Order",
        field: "row",
        formatter: "html",
        cellClick: function(e, cell) {
          e.stopPropagation();  // prevent the table row click event
          setSelectedRow(cell.getRow());
          setContextMenu({anchorPosition: { top: e.clientY, left: e.clientX }});
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

  // create the table when the component is mounted
  useEffect(() => {
    if (tableData.length > 0) {
      try {
        const sortedData = [...tableData].sort((a, b) => a.row - b.row);
        const table = new Tabulator(tableRef.current, {
          data: sortedData,
          columns,
          rowFormatter,
          selectable: true,
        });
        tableInstanceRef.current = table;
        return () => table.destroy();
      } catch (e) {
        console.error("Error creating table:", e);
      }
    } else {
      console.log("none");
    }
  }, [tableData, columns, rowFormatter]); // Removed the duplicated tableData


const handleMoveUp = () => {
  if (selectedRow) {
    const currentIndex = tableData.findIndex(data => data.row === selectedRow._row.data.row);
    if (currentIndex > 0) {
      setTableData(prevData => {
        const newData = [...prevData];
        const tempRow = newData[currentIndex];
        newData[currentIndex] = newData[currentIndex - 1];
        newData[currentIndex - 1] = tempRow;
        return newData.map((data, index) => ({ ...data, row: index + 1 }));
      });
    }
  }
  setContextMenu({ anchorPosition: null });
};

const handleMoveDown = () => {
  if (selectedRow) {
    const currentIndex = tableData.findIndex(data => data.row === selectedRow._row.data.row);
    const rowCount = tableData.length;
    if (currentIndex < rowCount - 1) {
      setTableData(prevData => {
        const newData = [...prevData];
        const tempRow = newData[currentIndex];
        newData[currentIndex] = newData[currentIndex + 1];
        newData[currentIndex + 1] = tempRow;
        return newData.map((data, index) => ({ ...data, row: index + 1 }));
      });
    }
  }
  setContextMenu({ anchorPosition: null });
};






  const handleClose = () => {
    setContextMenu({anchorPosition: null});
  };

const handleSubmit = () => {
  const tableData = tableInstanceRef.current.getData();
  console.log(tableData);
};


  const open = Boolean(contextMenu.anchorPosition);
  const id = open ? 'context-menu-popover' : undefined;

  // render the div that will contain the table
  return (
    <div>
      <div key="table-container" ref={tableRef} />
      <Popover
        id={id}
        open={open}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu.anchorPosition}
        onClose={handleClose}
        onClick={handleClose}
      >
        <Button onClick={handleMoveUp}>Move Up</Button>
        <Button onClick={handleMoveDown}>Move Down</Button>
      </Popover>
    <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

// export the Table component
export default Table;
