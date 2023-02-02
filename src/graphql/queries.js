import { gql } from "@apollo/client";
import { ItemFields } from "./fragments";

export const GET_ITEMS = gql`
  ${ItemFields}
  query Get_Items($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String!, $after: String, $first: Int) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first) {
      edges {
        node {
          ...ItemFields
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

export const GET_ITEM = gql`
  ${ItemFields}
  query Get_Item ($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...ItemFields
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`

export const GET_USER = gql`
  query GET_USER {
    me {
      username
    }
  }
`

export const GET_USER_REVIEWS = gql`
  query GET_USER($first: Int, $after: String) {
    me {
      username
      reviews (first: $first, after: $after) {
        edges {
          node {
            rating
            createdAt
            text
            repositoryId
            id
            user {
              username
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`