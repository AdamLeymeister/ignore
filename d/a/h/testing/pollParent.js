import React from 'react';
import CommonComponent from './CommonComponent';
import { useShortPolling } from './hooks/useShortPolling'; // path to your hook

function ParentComponent() {
  const fetchData = () => useShortPolling({
    url: 'https://api.example.com/status',
    interval: 5000,
    conditionFn: data => data.isComplete
  });

  return <CommonComponent useDataHook={fetchData} />;
}

export default ParentComponent;
//--------------------------
import React from 'react';

function CommonComponent({ useDataHook }) {
  const { data, isLoading, error } = useDataHook();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Render the data or other UI logic
  return <div>{JSON.stringify(data)}</div>;
}

export default CommonComponent;
