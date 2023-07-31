import { useState, useEffect } from 'react';

function useArrayComparison(initialState, finalState) {
  const [addedObjects, setAddedObjects] = useState([]);
  const [removedObjects, setRemovedObjects] = useState([]);
  const [updatedObjects, setUpdatedObjects] = useState([]);

  useEffect(() => {
    const initialStateMap = new Map(initialState.map(obj => [obj.id, obj]));
    const finalStateMap = new Map(finalState.map(obj => [obj.id, obj]));

    let added = [];
    let removed = [];
    let updated = [];

    for (const [id, finalObj] of finalStateMap.entries()) {
      if (!initialStateMap.has(id)) {
        added.push(finalObj);
      } else {
        const initialObj = initialStateMap.get(id);
        if (JSON.stringify(finalObj) !== JSON.stringify(initialObj)) {
          updated.push(finalObj);
        }
      }
    }

    for (const [id, initialObj] of initialStateMap.entries()) {
      if (!finalStateMap.has(id)) {
        removed.push(initialObj);
      }
    }

    setAddedObjects(added);
    setRemovedObjects(removed);
    setUpdatedObjects(updated);
  }, [initialState, finalState]);

  return { addedObjects, removedObjects, updatedObjects };
}

export default useArrayComparison;
