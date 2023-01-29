import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ITEMS } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const { loading, error, data } = useQuery(GET_ITEMS);

  useEffect(() => {
    if (error) {
      console.error(error);
      return;
    }
    if (!loading && data) {
      setRepositories(data.repositories);
    }
  }, [data, error, loading]);

  const fetchRepositories = () => {};

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;