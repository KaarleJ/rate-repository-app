import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password}) {
      accessToken
    }
  }
`

export const SIGN = gql`
  mutation Sign($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password}) {
      username
    }
  }
`

export const REVIEW = gql`
  mutation Review($ownerName: String!, $rating: Int!, $repositoryName: String!, $text: String!) {
    createReview(review: { ownerName: $ownerName, rating: $rating, repositoryName: $repositoryName, text: $text}) {
      createdAt
      rating
      text
      repositoryId
      user {
        username
      }
    }
  }
`
export const DELETE_REVIEW = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`