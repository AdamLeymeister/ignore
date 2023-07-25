const getKeypadData = async () => {
    return [
        {
            id: Date.now(),
            name: "bracket 1",
            values: [
                {
                    name: "GA",
                    value: false,
                },
                {
                    name: "AL",
                    value: false,
                },
                {
                    name: "CA",
                    value: true,
                },
            ],
        },
        {
            id: Date.now(),
            name: "bracket 2",
            values: [
                {
                    name: "GA",
                    value: false,
                },
                {
                    name: "AL",
                    value: false,
                },
                {
                    name: "CA",
                    value: true,
                },
            ],
        },
        {
            id: Date.now(),
            name: "bracket 3",
            values: [
                {
                    name: "GA",
                    value: false,
                },
                {
                    name: "AL",
                    value: true,
                },
                {
                    name: "CA",
                    value: true,
                },
            ], 
        },
        {
            id: Date.now(),
            name: "bracket 4",
            values: [
                {
                    name: "GA",
                    value: false,
                },
                {
                    name: "AL",
                    value: false,
                },
                {
                    name: "CA",
                    value: true,
                },
            ], 
        },
    ];
};

const convertData = async () => {
    // Fetch the data
    const data = await getKeypadData();

    // The maximum number of rows that exist in any column 
    // We will need to loop this many times to ensure we get every row from every column.
    const maxValuesLength = Math.max(...data.map(item => item.values.length));
    
    // This is where the restructured data is stored.
    const convertedData = [];

    // This outer loop is for iterating over each row.
    for(let i = 0; i < maxValuesLength; i++) {
        // This inner loop is for iterating over each column for the current row.
        data.forEach(item => {
            // If a value exists at the current row for the current, we create a new object
            // and add it to convertedData. If no value exists, we do nothing for this iteration of the loop.
            if(item.values[i]) {
                // Create a new object with the desired structure and add it to convertedData.
                convertedData.push({ name: item.name, state: item.values[i].name, value: item.values[i].value });
            }
        });
    }

    return convertedData;
}

convertData().then(console.log);
