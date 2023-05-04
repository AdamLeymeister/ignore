import React, { useCallback, useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { tableData } from "./data";
import "tabulator-tables/dist/css/tabulator.min.css";
import "./TestTable.css";
import * as ReactDOMServer from "react-dom/server";

const TestTable = () => {
  const tableRef = useRef(null);
  const handleFriendClick = () => {
    console.log("FRIEND");
  };

  const setupTable = useCallback(() => {
    const InviteCheckbox = ({ name, checked, onChange }) => {
      const label = React.createElement(
        "label",
        {},
        React.createElement("input", {
          type: "checkbox",
          name,
          checked,
          onChange,
        }),
        name
      );
      return React.createElement("div", { className: "friend" }, label);
    };
    const table = new Tabulator(tableRef.current, {
      height: 205,
      data: tableData ?? [],
      layout: "",
      columns: [
        { title: "Name", field: "name", width: 150 },
        { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
        { title: "Favourite Color", field: "col" },
        {
          title: "Date Of Birth",
          field: "dob",
          sorter: "date",
          hozAlign: "center",
        },
        {
          title: "invite",
          field: "friends",
          hozAlign: "center",
          formatter: function (cell) {
            const friends = cell.getValue();
            const friendList = friends
              .map((friend) =>
                React.createElement(InviteCheckbox, {
                  id: friend.id,
                  checked: friend.added,
                  onChange: handleFriendClick,
                })
              )
              .map((element) => ReactDOMServer.renderToString(element))
              .join("");

            return friendList
          },
        },
        {
          title: "Friends",
          field: "friends",
          hozAlign: "center",
          formatter: function (cell) {
            const friends = cell.getValue();
            const friendList = friends
              .map((friend) => friend.name)
              .join("<br>");

            return `<div class="friend">
                      <div class="label">${friendList}</div>
                    </div>`;
          },
        },
      ],
    });

    return table;
  }, []);

  useEffect(() => {
    console.log(tableData);
    const table = setupTable();
    return () => {
      table.destroy();
    };
  }, [setupTable, tableData]);

  return <div className="test-table" ref={tableRef} />;
};

export default TestTable;
