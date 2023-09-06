import React from 'react';
import './App.css';
import PieChartTable2 from './PieChart/PieChartObjects';
import PieChartCommon from './PieChart/PieChartCommon';

function App() {
  const [selectedRow, setSelectedRow] = React.useState(null);

  const newMockData = {
    column1: 'John',
    column2: {goodPercent: 50, badPercent: 50, neutralPercent: 0, goodCount: 3, badCount: 2, neutralCount: 4},
    column3: {goodPercent: 40, badPercent: 50, neutralPercent: 10, goodCount: 3, badCount: 2, neutralCount: 4},
    column4: {goodPercent: 20, badPercent: 80, neutralPercent: 0, goodCount: 3, badCount: 2, neutralCount: 4},
    column5: 'stuff',
    column6: 'more stuff',
  }

const findPieChartColumns = (obj) => {
    const pieChartColumns = {};

    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === 'object' && 'goodCount' in value && 'badCount' in value && 'neutralCount' in value) {
        pieChartColumns[key] = [
          { value: value.goodPercent, label: `${value.goodCount} (${value.goodPercent}%)`, status: 1 },
          { value: value.badPercent, label: `${value.badCount} (${value.badPercent}%)`, status: 2 },
          { value: value.neutralPercent, label: `${value.neutralCount} (${value.neutralPercent}%)`, status: 3 }
        ];
      }
    }

    return pieChartColumns;
};


  React.useEffect(() => {
    setSelectedRow(findPieChartColumns(newMockData));
  }, []); 

  return (
    <div className="App">
      <header className="App-header">
        <PieChartTable2/>
        {selectedRow && Object.keys(selectedRow).map((key, index) => (
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
