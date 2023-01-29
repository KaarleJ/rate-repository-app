import { gql } from "@apollo/client";
import { ItemFields } from "./fragments";

export const GET_ITEMS = gql`
  ${ItemFields}
  query GET_ITEMS {
    repositories {
      edges {
        node {
          ...ItemFields
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