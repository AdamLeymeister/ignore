import React, { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { tableData } from "./data";
import "tabulator-tables/dist/css/tabulator.min.css";
import "./TestTable.css";

const TestTable = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) {
      const table = new Tabulator(tableRef.current, {
        data: tableData,
        layout: "fitData",
        columns: [
          { title: "ID", field: "id" },
          { title: "Name", field: "name" },
          {
            title: "Friends",
            field: "friends",
            formatter: function (cell, formatterParams, onRendered) {
              const friends = cell.getValue();
              console.log(friends);
              const friendNames = friends.map((friend) => friend.name);
              return friendNames.join(", ");
            },
          },
          {
            title: "Checkbox",
            field: "friends",
            formatter: function (cell, formatterParams, onRendered) {
              const friends = cell.getValue();

              // Create a container element to hold the checkboxes
              const checkboxContainer = document.createElement("div");

              // Loop through each friend and create a checkbox for each
              for (const friend of friends) {
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.addEventListener("click", () => {
                  console.log("Clicked");
                });
                checkboxContainer.appendChild(checkbox);

                const label = document.createElement("label");
                label.textContent = friend.name;
                checkboxContainer.appendChild(label);

                checkboxContainer.appendChild(document.createElement("br"));
              }
              return checkboxContainer;
            },
          },
        ],
      });
      return () => {
        table.destroy();
      };
    }
  }, []);

  return <div ref={tableRef}></div>;
};

export default TestTable;
