import { REVIEW, DELETE_REVIEW } from "../graphql/mutations";

import { useMutation } from '@apollo/client';

export const useReview = () => {
  const [ review, result] = useMutation(REVIEW)

  const sendReview = async ({ ownerName, repositoryName, rating, text }) => {
    const { data } = await review({ variables: { ownerName, rating, repositoryName, text }})
    return data
  }
  
  return [ sendReview, result ];
}

export const useReviewRemove = () => {
  const [ remove, result ] = useMutation(DELETE_REVIEW)

  const deleteReview = async (deleteReviewId) => {
    console.log('removing')
    await remove({ variables: { deleteReviewId }})
 }

  return [ deleteReview, result]
}