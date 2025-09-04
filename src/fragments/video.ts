import { graphql } from '../graphql/gql'

export const Video = graphql(`
  fragment Video on Video {
    _system_ {
        id
        codename
      }
      headline
      description
      videoLink
      caption
      autoplay {
        items {
          _system_ {
            codename
            name
          }
        }
      }
  }
`)