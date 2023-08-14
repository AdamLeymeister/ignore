import { useQuery } from 'react-query';
import axios from 'axios';

const getData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const useShortPolling = ({ 
  url, 
  interval = 5000, 
  conditionFn = () => false 
}) => {
  return useQuery({
    queryKey: ['shortPolling', url],
    queryFn: () => getData(url),
    config: {
      refetchInterval: interval,
      refetchIntervalInBackground: true,
      retry: false,
      onSuccess: (data) => {
        if (conditionFn(data)) {
          queryClient.removeQueries(['shortPolling', url]);
        }
      },
    }
  });
};

export default useShortPolling;


//imp
import useShortPolling from './useShortPolling';

function Table() {
  const { data, isLoading, error } = useShortPolling({
    url: 'https://api.example.com/status',
    interval: 5000,
    conditionFn: data => data.isComplete
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>Status: {data.status}</div>;
}
