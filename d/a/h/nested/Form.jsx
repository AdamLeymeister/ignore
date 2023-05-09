import React, { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { tableData } from "./data";
import {replaceNullValues} from './useReplaceNulls'
import "tabulator-tables/dist/css/tabulator.min.css";
import "./TestTable.css";

const TestTable = () => {
  const tableRef = useRef(null);
  const mockData = replaceNullValues(tableData)
  console.log(mockData)
  useEffect(() => {
      const table = new Tabulator(tableRef.current, {
        data: mockData || [],
        layout: "fitData",
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
            formatter: (cell) => {
              const friends = cell.getValue();
              const checkboxes = friends.map((friend) => {
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.addEventListener("click", () => {
                    friend.isAdded = checkbox.checked;
                  console.log(friend.name + ' isAdded: ' + friend.isAdded);

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
      });

      return () => {
        table.destroy();
      };
  }, [mockData]);

  return <div ref={tableRef}></div>;
};

export default TestTable;
