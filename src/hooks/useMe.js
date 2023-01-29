import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';

const useRepositories = () => {
  const [ me, setMe] = useState();
  const { loading, error, data } = useQuery(GET_USER);

  useEffect(() => {
    if (error) {
      console.error(error);
      return;
    }
    if (!loading && data) {
      setMe(data.me);
    }
  }, [data, error, loading]);

  const fetchRepositories = () => {};

  return { me, loading, refetch: fetchRepositories };
};

export default useRepositories;