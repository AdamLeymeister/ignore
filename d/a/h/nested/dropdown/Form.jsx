import FilterableDropdown from './FilterableDropdown';

function App() {
  const options = [
    { id: 1, name: 'Option1', otherData: [1, 2, 3] },
    { id: 2, name: 'Option2', otherData: [4, 5, 6] },
    { id: 3, name: 'Option3', otherData: [4, 5, 6] },
    { id: 4, name: 'Option4', otherData: [4, 5, 6] },
    { id: 5, name: 'Option5', otherData: [4, 5, 6] },
  ];

  const handleOptionSelected = (option) => {
    console.log(`Chosen option: `, option);
  };
  return (
    <div className="App">
    <FilterableDropdown
      options={options}
      onOptionSelected={handleOptionSelected}
      labelKey="name"
    />
    </div>
  );
}

export default App;
