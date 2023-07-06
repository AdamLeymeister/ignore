import FilterableDropdown from './FilterableDropdown';


function App() {
  const data = [
    { id: 1, name: 'Apple', type: ['red', 'blue'] },
    { id: 2, name: 'Carrot', type: ['red', 'green'] },
    { id: 3, name: 'Banana', type: 'yellow' },
    { id: 4, name: 'Broccoli', type: ['black', 'yellow'] },
  ];

  const handleOptionSelected = (option) => {
    console.log(`Chosen option: `, option);
  };
  return (
    <div className="App">
    <FilterableDropdown
      options={data}
      onOptionSelected={handleOptionSelected}
      labelKey="name"
      dropdownDirection="bottom"
      isNested={true}
      nameType="type"
    />
    </div>
  );
}

export default App;
