import { useState, useCallback } from 'react';

const removeDuplicates = (data) => {
  const seen = new Set();

  return data.filter(item => {
    const duplicate = seen.has(item.id + '|' + item.version);
    seen.add(item.id + '|' + item.version);
    return !duplicate;
  });
};

const useRemoveDuplicates = (initialData) => {
  const [data, setData] = useState(() => removeDuplicates(initialData));

  const updateData = useCallback((newData) => {
    setData(removeDuplicates(newData));
  }, []);

  return [data, updateData];
};

export default useRemoveDuplicates;
