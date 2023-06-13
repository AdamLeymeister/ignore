import React, { useEffect, useRef, useState } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { tableData } from "./data";
import { replaceNullValues } from "./useReplaceNulls";
import "tabulator-tables/dist/css/tabulator.min.css";
import "./TestTable.css";

const greenCheckSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50">
    <polyline points="10 25 20 35 40 15" stroke="green" stroke-width="4" fill="none" />
</svg>
`;

const redCrossSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50">
    <line x1="15" y1="15" x2="35" y2="35" stroke="red" stroke-width="4"/>
    <line x1="35" y1="15" x2="15" y2="35" stroke="red" stroke-width="4"/>
</svg>
`;

const TestTable = () => {
  const [selectedRows, setSelectedRows] = useState([]); // store ids of selected rows
  const addIsAddedToFriends = (row) => {
    if (row.friends) {
      row.friends = row.friends.map((friend) => ({ ...friend, isAdded: true }));
    }
    return row;
  };
  const submitData = async () => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const [data, setData] = useState(
    replaceNullValues(tableData, undefined, addIsAddedToFriends)
  );

  const tableRef = useRef(null);
  const numericInputEditor = (cell, onRendered, success) => {
    const editor = document.createElement("input");

    editor.setAttribute("type", "number");

    editor.value = cell.getValue();

    onRendered(() => {
      editor.focus();
      editor.style.css = "100%";
    });

    const successFunc = () => {
      success(editor.value);
    };

    editor.addEventListener("change", successFunc);
    editor.addEventListener("blur", successFunc);

    return editor;
  };

  useEffect(() => {
    console.log("render");
    const table = new Tabulator(tableRef.current, {
      data: data || [],
      layout: "fitData",
      selectable: true,
      virtualDom: true,
      columns: [
        { title: "ID", field: "id" },
        {
          title: "Age",
          field: "age",
          editor: "input",
          editorParams: {
            type: "number",
          },
          validator: ["required", "integer"],
        },
        {
          title: "Age",
          field: "age",
          editor: numericInputEditor,
          validator: ["required", "integer"],
        },
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
            const icons = friends.map((friend) => {
              const div = document.createElement("div");
              div.innerHTML = friend.isAdded ? greenCheckSvg : redCrossSvg;
              div.addEventListener("click", (e) => {
                e.stopPropagation(); // prevent row click event from firing
                friend.isAdded = !friend.isAdded;
                setData([...data]); // This triggers a re-render with the updated data
              });
              return div;
            });

            return icons.reduce((container, element) => {
              container.appendChild(element);
              container.classList.add("label");
              return container;
            }, document.createElement("div"));
          },
        },
      ],
      rowSelected: function (row) {
        setSelectedRows([...selectedRows, row.getData().id]);
      },
      rowDeselected: function (row) {
        setSelectedRows(selectedRows.filter((id) => id !== row.getData().id));
      },
    });

    // re-select rows after re-render
    selectedRows.forEach((rowId) => {
      let row = table.getRow(rowId);
      if (row) {
        row.select();
      }
    });

    return () => {
      table.destroy();
    };
  }, [data, selectedRows, submitData]);

  return (
    <div>
      <div ref={tableRef}></div>
      <button onClick={submitData}>Submit Data</button>
    </div>
  );
};

export default TestTable;
