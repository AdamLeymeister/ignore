import { useQuery, useQueryClient } from 'react-query';
import { useState, useEffect } from 'react';

const useSequentialQueries = (queries) => {
  const queryClient = useQueryClient();
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState([]);

  const currentQuery = queries[index];
  
  const { data, isSuccess, error } = useQuery({
    queryKey: currentQuery.key,
    queryFn: currentQuery.fn,
    enabled: index < queries.length, 
    retry: 1
  });

  useEffect(() => {
    if (isSuccess) {
      setResults((prev) => [...prev, data]);
      if (index < queries.length - 1) {
        setIndex((prevIndex) => prevIndex + 1);
      }
    }
  }, [isSuccess, data]);

  return {
    results,
    error,
    isLoading: index < queries.length,
    invalidateQuery,
  };
};
