import { graphql } from '../graphql/gql'

export const Solution = graphql(`
  fragment Solution on Solution {
    __typename
    _system_ {
      id
      codename
    }
    headline
    introduction
    image {
      items {
        ...Asset
      }
    }
  }
`)