import { useState, useCallback } from 'react';

const removeIntersectedItems = (baseData, removeData) => {
  const removeSet = new Set(removeData.map(item => item.id + '|' + item.version));
  return baseData.filter(item => !removeSet.has(item.id + '|' + item.version));
};

const useRemoveIntersectedItems = (baseData, removeData) => {
  const [data, setData] = useState(() => removeIntersectedItems(baseData, removeData));

  const updateData = useCallback((newBaseData, newRemoveData) => {
    setData(removeIntersectedItems(newBaseData, newRemoveData));
  }, []);

  return [data, updateData];
};

export default useRemoveIntersectedItems;

  const [data, updateData] = useRemoveIntersectedItems(initialBaseData, initialRemoveData);
