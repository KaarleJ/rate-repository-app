import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_USER_REVIEWS } from '../graphql/queries';

const useMe = () => {
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


  return { me, loading };
};

export default useMe;

export const useMeReviews = (first) => {
  const [ reviews, setReviews ] = useState();
  const { data, error, loading, fetchMore, refetch, ...result } = useQuery(GET_USER_REVIEWS, {
    variables: {
      includeReviews: true,
      first
    }
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      return;
    }
    if (!loading && data) {
      setReviews(data.me.reviews);
    }
  }, [data, error, loading]);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        first
      },
    });
  };

  return { reviews, loading, fetchMore: handleFetchMore, refetch, result };
}