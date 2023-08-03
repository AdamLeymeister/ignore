import React, { useEffect, useRef, useState } from 'react';
import Tabulator from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';
import { mockData } from './mock.js';

const flattenData = (data) => {
  return Object.entries(data).flatMap(([parent, categories]) => 
    categories.flatMap(category => 
      category.players.map(player => 
        ({...player, parent})
      )
    )
  );
}

function TableOne() {
    const [selectedRow, setSelectedRow] = useState(null); 
    const [data, setData] = useState(flattenData(mockData));
    const tableRef = useRef();
    let tabulatorInstance = null; // To hold the Tabulator instance

    useEffect(() => {
        console.log(data)
    }, [data]);

    const columns = [
        { title: 'Name', field: 'name', width: 200 },
        { title: 'Age', field: 'age', align: 'left', formatter: 'number' },
        { title: 'Parent', field: 'parent' },
    ];

    useEffect(() => {
        tabulatorInstance = new Tabulator(tableRef.current, {
            data: data,
            columns: columns,
            rowClick: function(e, row) {
                setSelectedRow(row.getData()); 
            },
        });
    }, []);

    const handleClick = () => {
        tabulatorInstance.setGroupBy('parent') 
        console.log(tabulatorInstance)
    }

    return (
        <div>
            <div ref={tableRef} />
            <button onClick={handleClick}>Click me</button>
            <pre>
                {JSON.stringify(selectedRow, null, 2)}
            </pre>
        </div>
    );
}

export default TableOne;
