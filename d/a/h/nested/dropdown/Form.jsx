import logo from './logo.svg';
import './App.css';
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
      <header className="App-header">
    <FilterableDropdown
      options={data}
      onOptionSelected={handleOptionSelected}
      labelKey="name"
      dropdownDirection="bottom"
      isNested={true}
      nameType="type"
      defaultValue="Grape"
    />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
