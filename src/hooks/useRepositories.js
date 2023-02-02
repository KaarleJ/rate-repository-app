import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ITEMS, GET_ITEM } from '../graphql/queries';

const useRepositories = (order, searchWord, first) => {
  const { orderBy, orderDirection} = order
  const [repositories, setRepositories] = useState();
  const { loading, error, data, fetchMore, ...result } = useQuery(GET_ITEMS, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy: orderBy, orderDirection: orderDirection, searchKeyword: searchWord, first }
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      return;
    }
    if (!loading && data) {
      setRepositories(data.repositories);
    }
  }, [data, error, loading]);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy: orderBy,
        orderDirection: orderDirection,
        searchKeyword: searchWord,
        first
      },
    });
  };

  return { repositories, loading, fetchMore: handleFetchMore, result };
};

export default useRepositories;

export const useRepository = (id, first) => {
  const [ repository, setRepository ] = useState();
  const { loading, error, data, fetchMore, ...result } = useQuery(GET_ITEM, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId: id, first }
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      return;
    }
    if (!loading && data) {
      setRepository(data.repository);
    }
  }, [data, error, loading]);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        repositoryId: id,
        after: data.repository.reviews.pageInfo.endCursor,
        first
      },
    });
  };

  return { repository, loading, fetchMore: handleFetchMore, result };
}