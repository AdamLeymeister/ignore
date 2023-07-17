import React, { useEffect, useRef, useState } from 'react';
import Tabulator from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';

function TableComponent() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [combinedData, setCombinedData] = useState([]);
    const basicTableRef = useRef();

    // Define mock data
    const mockData = {
        basicDetails: [
            { basicId: 1, basicpd:1, name: 'John', age: 30, finish: 3, color: 'blue' },
            { basicId: 2, basicpd: 2, name: 'Jane', age: 40, finish: 1, color: 'green' },
            { basicId: 3, basicpd: 3, name: 'Jack', age: 50, finish: 2, color: 'orange' },
        ],
        additionalInformation: [
            { additionalid: 1, additionalpd:1, height: '234', city: "ATL", state:'GA' },
            { additionalid: 2, additionalpd:2, height: '442', city: "OL", state:'PL' },
        ],
        additionalDetails: [
            { id: 1, pd:1, size: 'asdf23', food: "yea", water:'sometimes' },
            { id: 2, pd:2, size: '2lk3k', food: "a", water:'a34' },
        ],
    };

// Define a function to merge any number of arrays and combine objects with matching keys
const mergeArrays = (arrays, keyPairs) => {
    // Start with an empty array to hold our result
    let result = [];

    // Iterate over each array we were given
    arrays.forEach((arr, arrIndex) => {
        // Get the keys we are using for this particular array
        const keys = keyPairs[arrIndex];

        // For each array, iterate over each item in that array
        arr.forEach((arrItem) => {
            // Try to find an item in the result array that matches the current item
            // We say two items match if every key in our keys array has the same value in both items
            const resultItem = result.find(
                item => keys.every((key, keyIndex) => item[keyPairs[0][keyIndex]] === arrItem[key])
            );
            // If we found a matching item in the result array
            if (resultItem) {
                // Update the matching item in the result array with the properties of the current item
                // This is where we "combine" two matching items
                Object.assign(resultItem, arrItem);
            } else {
                // If we didn't find a matching item in the result array, add the current item to the result array
                result.push(arrItem);
            }
        });
    });

    // Return the combined result array
    return result;
};

// Later, when we use this function:
useEffect(() => {
    // Call our merge function with the arrays we want to combine and the keys we want to match on
    const combinedAdditionalData = mergeArrays(
        [mockData.basicDetails, mockData.additionalInformation, mockData.additionalDetails],
        [['basicId', 'basicpd'], ['additionalid', 'additionalpd'], ['id', 'pd']]
    );
    // Update our state with the combined data
    setCombinedData(combinedAdditionalData);
}, []);




    // Define table columns
    const columns = [
        { title: 'Name', field: 'name', width: 200 },
        { title: 'Age', field: 'age', align: 'left', formatter: 'number' },
        { title: 'Color', field: 'color' },
        { title: 'Height', field: 'height' },
        { title: 'City', field: 'city' },
        { title: 'State', field: 'state' },
        { title: 'Size', field: 'size' },
        { title: 'Food', field: 'food' },
        { title: 'Water', field: 'water' },
        { title: 'Finisher', field: 'finish', editor: "input" },
    ];

    useEffect(() => {
        const table = new Tabulator(basicTableRef.current, {
            data: combinedData,
            columns: columns,
            initialSort: [
                { column: 'finish', dir: 'asc' }, //sort by finish column in ascending order
            ],
            rowClick: function(e, row) {
                setSelectedRow(row.getData()); 
            },
            cellEdited: function(cell) {
                // Get the updated data for the row
                const updatedData = cell.getRow().getData();

                // Find and update the corresponding object in state
                const newData = combinedData.map(dataItem =>
                    dataItem.id === updatedData.id && dataItem.pd === updatedData.pd ? updatedData : dataItem
                );

                // Sort the new data
                const sortedData = newData.sort((a, b) => a.finish - b.finish);

                // Update state
                setCombinedData(sortedData);
            },
        });
    }, [combinedData]);

    return (
        <div>
            <div ref={basicTableRef} />
            <pre>
                {JSON.stringify(selectedRow, null, 2)}
            </pre>
        </div>
    );
}

export default TableComponent;
