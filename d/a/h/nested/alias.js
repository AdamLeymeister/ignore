const createAlias = (testName) => {
    switch(testName) {
        case 'ADD':
            return 'Addition Tool';
        case 'SUBTRACT':
            return 'Subtraction Tool';
        case 'MULTIPLY':
            return 'Multiplication Tool';
        default:
            return testName;
    }
};


const test = ({ testName }) => {
    const alias = createAlias(testName);
    console.log(alias);
};
