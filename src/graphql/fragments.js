import { gql } from '@apollo/client';

export const ItemFields = gql`
  fragment ItemFields on Repository {
    description
    forksCount
    fullName
    language
    ownerAvatarUrl
    ratingAverage
    reviewCount
    stargazersCount
    id
    url
  }
`;
