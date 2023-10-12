import React, { useEffect, useRef } from 'react';
import Tabulator from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';

const mockPeople = [
    {
        id: 1,
        name: "John Doe",
        age: 30,
        version: 1,
    },
    {
        id: 1,
        name: "Jane Doe",
        age: 25,
        version: 2,
    },
    {
        id: 1,
        name: "Jane Doe",
        age: 25,
        version: 3,
    },
    {
        id: 3,
        name: "John Smith",
        age: 35,
        version: 1,
    },
    {
        id: 4,
        name: "Jane Smith",
        age: 22,
        version: 1,
    }
];

function NestedTable() {
    const tableRef = useRef();
function groupBy(data, key) {
    return data.reduce((result, item) => {
        (result[item[key]] = result[item[key]] || []).push(item);
        return result;
    }, {});
}
function restructureData(data) {
    const groupedById = groupBy(data, 'id');
    
    console.log('id',groupedById);
    const restructured = Object.values(groupedById).map(group => {
        console.log('group',group);
        // Sort by version for consistency
        group.sort((a, b) => b.version - a.version);

        const primaryEntry = { ...group[0] };  // Create a shallow copy to avoid mutating the original data
        if (group.length > 1) {
            primaryEntry._children = group.slice(1);
        }

        return primaryEntry;
    });

    return restructured;
}

    useEffect(() => {
        new Tabulator(tableRef.current, {
            data: restructureData(mockPeople),
            dataTree:true,
            columns: [
                { title: "ID", field: "id", visible: false },
                { title: "Name", field: "name" },
                { title: "Age", field: "age" },
                { title: "Version", field: "version" }
            ]
        });
    }, []);

    return <div ref={tableRef}></div>;
}

export default NestedTable;
