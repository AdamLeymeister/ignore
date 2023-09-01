import React from 'react';
import './App.css';
import PieChartCommon from './PieChart/PieChartCommon';

function App() {
  const [selectedRow, setSelectedRow] = React.useState(null);

  const newRow = {
    column1: 'John',
    column2: [{ value: 3, label: "Apples", status:1 }, {stats: 3, value: 2, label: "Bananas" }, { status: 2,value: 4, label: "Cherries" }],
    column3: [{ value: 2, label: "Apples", status:1 }, {stats: 3, value: 2, label: "Bananas" }, { status: 2,value: 4, label: "Cherries" }],
    column4: [{ value: 3, label: "Apples", status:1 }, {stats: 3, value: 2, label: "Bananas" }, { status: 2,value: 4, label: "Cherries" }],
    column5: 'stuff',
    column6: 'more stuff',
  }

  const findPieChartColumns = (obj) => {
  const pieChartColumns = {};
  // Loop through each property of the object
  for (const [key, value] of Object.entries(obj)) {
    // Check if the property is an array
    if (Array.isArray(value)) {
      // Check if every item in the array is an object containing 'value' and 'label'
      if (value.every(item => (typeof item === 'object' && item !== null && 'value' in item && 'label' in item))) {
        // This is a pie chart column, add to the result object
        pieChartColumns[key] = value;
      }
    }
  }
  return pieChartColumns;
};



  React.useEffect(() => {
    setSelectedRow(findPieChartColumns(newRow));
  }, []); 

  return (
    <div className="App">
      <header className="App-header">
        {selectedRow && Object.keys(selectedRow).map((key,index) => (
          <div key={index}>
            <h3>{key}</h3>
            <PieChartCommon data={selectedRow[key]} width={100} height={100} />
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
