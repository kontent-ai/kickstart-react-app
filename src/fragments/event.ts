import { graphql } from '../graphql/gql'

export const Event = graphql(`
  fragment Event on Event {
    __typename
    _system_ {
      id
      codename
    }
    name
    description {
      html
    }
    startDate_with_timezone {
      display_timezone
      value
    }
    image {
      items {
        ...Asset
      }
    }
    eventTopic {
      items {
        _system_ {
          codename
          name
        }
      }
    }
    eventType {
      items {
        _system_ {
          codename
          name
        }
      }
    }
    endDate_with_timezone {
      display_timezone
      value
    }
  }
`)