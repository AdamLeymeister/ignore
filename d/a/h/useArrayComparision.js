import { useState, useEffect } from 'react';

function useArrayComparison(arrayOne, arrayTwo) {
  // Declare state variables for the objects not present in each array
  //let notInArrayOne = arrayTwo.filter(x => !arrayOne.includes(x));
  //let notInArrayTwo = arrayOne.filter(x => !arrayTwo.includes(x));
  const [notInArrayOne, setNotInArrayOne] = useState([]);
  const [notInArrayTwo, setNotInArrayTwo] = useState([]);

  useEffect(() => {
    // Declare maps to keep track of which objects are present in each array
    const arrayOneObjects = arrayOne.reduce((acc, obj) => {
      acc.set(obj.id, true);
      return acc;
    }, new Map());

    const arrayTwoObjects = arrayTwo.reduce((acc, obj) => {
      acc.set(obj.id, true);
      return acc;
    }, new Map());

    // Declare arrays to store the objects that are not in arrayOne or arrayTwo, respectively
    let notInOne = [];
    let notInTwo = [];

    // Loop through both arrays and check if each object's id property is not present in the other array
    // If it is not present, add the object to the corresponding notIn array
    for (let i = 0; i < arrayOne.length; i++) {
      if (!arrayTwoObjects.has(arrayOne[i].id)) {
        notInTwo.push(arrayOne[i]);
      }
    }

    for (let i = 0; i < arrayTwo.length; i++) {
      if (!arrayOneObjects.has(arrayTwo[i].id)) {
        notInOne.push(arrayTwo[i]);
      }
    }

    // Set the state variables to the respective arrays containing the objects that are not present in each array
    setNotInArrayOne(notInOne);
    setNotInArrayTwo(notInTwo);
  }, [arrayOne, arrayTwo]);

  // Return an object containing the state variables
  return { notInArrayOne, notInArrayTwo };
}

export default useArrayComparison;
