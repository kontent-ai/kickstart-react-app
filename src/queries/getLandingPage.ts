import { graphql } from '../graphql/gql'

export const GetLandingPageQuery = graphql(`
  query GetLandingPageQuery {
    landingPage_All(limit: 1) {
      items {
        _system_ {
          id
          name
          codename
        }
        headline
        subheadline
        heroImage {
          items {
            ...Asset
          }
        }
        bodyCopy {
          html
          components {
            items {
              ...Video
            }
          }
        }
        featuredContent {
          items {
            ... on Event {
              ...Event
            }
            ... on Article {
              ...Article
            }
          }
        }
      }
    }
  }
`)