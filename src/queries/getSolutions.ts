import { graphql } from '../graphql/gql'

export const GetSolutionsQuery = graphql(`
  query GetSolutionsQuery {
    solution_All {
      items {
        ...Solution
      }
    }
  }
`)