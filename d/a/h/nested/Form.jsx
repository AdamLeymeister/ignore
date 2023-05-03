import React, { useCallback, useEffect, useRef } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import {tableData} from './data';
import "tabulator-tables/dist/css/tabulator.min.css";
import "./TestTable.css";

const TestTable = () => {
  const tableRef = useRef(null);

  const setupTable = useCallback(() => {
    const table = new Tabulator(tableRef.current, {
      height: 205,
      data: tableData ?? [],
      layout: 'fitColumns',
      columns: [
        { title: 'Name', field: 'name', width: 150 },
        { title: 'Age', field: 'age', hozAlign: 'left', formatter: 'progress' },
        { title: 'Favourite Color', field: 'col' },
        { title: 'Date Of Birth', field: 'dob', sorter: 'date', hozAlign: 'center' },
        {
          title: 'Friends',
          field: 'friends',
          hozAlign: 'center',
          formatter: function (cell) {
            const friends = cell.getValue();
            const friendList = friends.map((friend) => friend.name).join('<br>');

            return `<div class="friend">
                      <div class="label">Friend</div>
                      <div class="label">${friendList}</div>
                    </div>`;
          },
        },
      ],
    });

    return table;
  }, []);

  useEffect(() => {
    console.log(tableData)
    const table = setupTable();
    return () => {
      table.destroy();
    };
  }, [setupTable, tableData]);

  return <div className="test-table" ref={tableRef} />;
};

export default TestTable;
