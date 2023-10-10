import React, { useEffect, useRef, useState } from 'react';
import Tabulator from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';
import { mockData } from './mock.js';
import {useQuery, useQueryClient} from 'react-query'
import { fetchPeople } from './useGetPeople.js';
import usePeople from './useGetPeople.js';

const flattenData = (data) => {
    return Object.entries(data).flatMap(([parent, categories]) =>
        categories.flatMap(category =>
            category.players.map(player =>
                ({ ...player, parent })
            )
        )
    );
}

function TableOne({ handleClicked }) {
    const queryClient = useQueryClient();
    const [selectedRows, setSelectedRows] = useState([]); 
    const [payload, setPayload] = React.useState();
    const [data, setData] = useState(flattenData(mockData));
    const tableRef = useRef();
    let tabulatorInstance = null;

    const columns = [
        { title: "Select", formatter: "rowSelection", titleFormatter: "rowSelection", hozAlign: "center", headerSort: false, cellClick: (e, cell) => { e.stopPropagation() } },
        { title: 'Name', field: 'name', width: 200 },
        { title: 'Age', field: 'age', align: 'left', formatter: 'number' },
        { title: 'Parent', field: 'parent' },
    ];

    const { data: people } = usePeople(payload);
    React.useEffect(() => {
        if (people) {
            setData(flattenData(people));
        }
    }, [people]);

    const handleBulkEdit = () => {
        // Example: Updating the age of all selected rows to 30
        selectedRows.forEach(row => {
            row.update({ age: 30 });
        });
    };

    useEffect(() => {
        tabulatorInstance = new Tabulator(tableRef.current, {
            data: data,
            columns: columns,
            selectable: true,
            rowSelectionChanged: function (data, rows) {
                setSelectedRows(rows);
            },
        });
    }, [people]);

    return (
        <div>
            <button onClick={handleBulkEdit}>Bulk Edit</button>
            <div ref={tableRef} />
        </div>
    );
}

export default TableOne;
