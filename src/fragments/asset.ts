import { graphql } from '../graphql/gql'

export const Asset = graphql(`
  fragment Asset on _Asset {
    url
    description
    width
    height
    type
    size
  }
`)