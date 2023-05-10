import React, { useEffect, useRef, useState } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { tableData } from "./data";
import { replaceNullValues } from './useReplaceNulls'
import "tabulator-tables/dist/css/tabulator.min.css";
import "./TestTable.css";

const TestTable = () => {
    const [selectedRows, setSelectedRows] = useState([]); // store ids of selected rows
    const addIsAddedToFriends = (row) => {
        if (row.friends) {
          row.friends = row.friends.map(friend => ({ ...friend, isAdded: true }));
        }
        return row;
    };
    const [data, setData] = useState(replaceNullValues(tableData, undefined, addIsAddedToFriends));
    const tableRef = useRef(null);

  useEffect(() => {
    const table = new Tabulator(tableRef.current, {
      data: data || [],
      layout: "fitData",
      selectable: true,
      columns: [
        { title: "ID", field: "id" },
        { title: "Name", field: "name" },
        {
          title: "Friends",
          field: "friends",
          formatter: (cell) => {
            const friends = cell.getValue();
            const container = friends.reduce((acc, friend) => {
              const div = document.createElement("div");
              div.textContent = friend.name;
              div.classList.add("label");
              acc.appendChild(div);
              return acc;
            }, document.createElement("div"));
            return container;
          },
        },
        {
          title: "Checkbox",
          field: "friends",
          formatter: (cell, formatterParams, onRendered) => {
            const friends = cell.getValue();
            const checkboxes = friends.map((friend) => {
              const checkbox = document.createElement("input");
              checkbox.type = "checkbox";
              checkbox.checked = friend.isAdded || false;
              checkbox.addEventListener("change", (e) => {
                e.stopPropagation(); // prevent row click event from firing
                friend.isAdded = checkbox.checked;
                setData([...data]); // This triggers a re-render with the updated data
              });

              const label = document.createElement("label");
              label.textContent = friend.name;

              return [checkbox, label];
            });

            return checkboxes.flat().reduce((container, element) => {
              container.appendChild(element);
              container.classList.add("label");
              return container;
            }, document.createElement("div"));
          },
        },
      ],
      rowSelected: function(row) { 
        console.log('2')
        setSelectedRows([...selectedRows, row.getData().id]);
      },
      rowDeselected: function(row) {
        console.log('3')
        setSelectedRows(selectedRows.filter(id => id !== row.getData().id));
      },
    });

    // re-select rows after re-render
    selectedRows.forEach(rowId => {
        console.log("44")
      let row = table.getRow(rowId);
      if (row) {
        row.select();
      }
    });

    return () => {
      table.destroy();
    };
  }, [data, selectedRows]);

  const submitData = async () => {
    try {
        console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div ref={tableRef}></div>
      <button onClick={submitData}>Submit Data</button>
    </div>
  );
};

export default TestTable;
