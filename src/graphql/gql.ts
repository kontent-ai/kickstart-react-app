/* eslint-disable */
import * as types from "./graphql";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  fragment Article on Article {\n    __typename\n    _system_ {\n      id\n      codename\n    }\n    title\n    introduction\n    bodyCopy {\n      html\n    }\n    publishDate_with_timezone {\n      display_timezone\n      value\n    }\n    image {\n      items {\n      ...Asset\n      }\n    }\n  }\n":
    typeof types.ArticleFragmentDoc;
  "\n  fragment Asset on _Asset {\n    url\n    description\n    width\n    height\n    type\n    size\n  }\n":
    typeof types.AssetFragmentDoc;
  "\n  fragment Event on Event {\n    __typename\n    _system_ {\n      id\n      codename\n    }\n    name\n    description {\n      html\n    }\n    startDate_with_timezone {\n      display_timezone\n      value\n    }\n    image {\n      items {\n        ...Asset\n      }\n    }\n    eventTopic {\n      items {\n        _system_ {\n          codename\n          name\n        }\n      }\n    }\n    eventType {\n      items {\n        _system_ {\n          codename\n          name\n        }\n      }\n    }\n    endDate_with_timezone {\n      display_timezone\n      value\n    }\n  }\n":
    typeof types.EventFragmentDoc;
  "\n  fragment Solution on Solution {\n    __typename\n    _system_ {\n      id\n      codename\n    }\n    headline\n    introduction\n    image {\n      items {\n        ...Asset\n      }\n    }\n  }\n":
    typeof types.SolutionFragmentDoc;
  "\n  fragment Video on Video {\n    _system_ {\n        id\n        codename\n      }\n      headline\n      description\n      videoLink\n      caption\n      autoplay {\n        items {\n          _system_ {\n            codename\n            name\n          }\n        }\n      }\n  }\n":
    typeof types.VideoFragmentDoc;
  "\n  query GetLandingPageQuery {\n    landingPage_All(limit: 1) {\n      items {\n        _system_ {\n          id\n          name\n          codename\n        }\n        headline\n        subheadline\n        heroImage {\n          items {\n            ...Asset\n          }\n        }\n        bodyCopy {\n          html\n          components {\n            items {\n              ...Video\n            }\n          }\n        }\n        featuredContent {\n          items {\n            ... on Event {\n              ...Event\n            }\n            ... on Article {\n              ...Article\n            }\n          }\n        }\n      }\n    }\n  }\n":
    typeof types.GetLandingPageQueryDocument;
  "\n  query GetSolutionsQuery {\n    solution_All {\n      items {\n        ...Solution\n      }\n    }\n  }\n":
    typeof types.GetSolutionsQueryDocument;
};
const documents: Documents = {
  "\n  fragment Article on Article {\n    __typename\n    _system_ {\n      id\n      codename\n    }\n    title\n    introduction\n    bodyCopy {\n      html\n    }\n    publishDate_with_timezone {\n      display_timezone\n      value\n    }\n    image {\n      items {\n      ...Asset\n      }\n    }\n  }\n":
    types.ArticleFragmentDoc,
  "\n  fragment Asset on _Asset {\n    url\n    description\n    width\n    height\n    type\n    size\n  }\n":
    types.AssetFragmentDoc,
  "\n  fragment Event on Event {\n    __typename\n    _system_ {\n      id\n      codename\n    }\n    name\n    description {\n      html\n    }\n    startDate_with_timezone {\n      display_timezone\n      value\n    }\n    image {\n      items {\n        ...Asset\n      }\n    }\n    eventTopic {\n      items {\n        _system_ {\n          codename\n          name\n        }\n      }\n    }\n    eventType {\n      items {\n        _system_ {\n          codename\n          name\n        }\n      }\n    }\n    endDate_with_timezone {\n      display_timezone\n      value\n    }\n  }\n":
    types.EventFragmentDoc,
  "\n  fragment Solution on Solution {\n    __typename\n    _system_ {\n      id\n      codename\n    }\n    headline\n    introduction\n    image {\n      items {\n        ...Asset\n      }\n    }\n  }\n":
    types.SolutionFragmentDoc,
  "\n  fragment Video on Video {\n    _system_ {\n        id\n        codename\n      }\n      headline\n      description\n      videoLink\n      caption\n      autoplay {\n        items {\n          _system_ {\n            codename\n            name\n          }\n        }\n      }\n  }\n":
    types.VideoFragmentDoc,
  "\n  query GetLandingPageQuery {\n    landingPage_All(limit: 1) {\n      items {\n        _system_ {\n          id\n          name\n          codename\n        }\n        headline\n        subheadline\n        heroImage {\n          items {\n            ...Asset\n          }\n        }\n        bodyCopy {\n          html\n          components {\n            items {\n              ...Video\n            }\n          }\n        }\n        featuredContent {\n          items {\n            ... on Event {\n              ...Event\n            }\n            ... on Article {\n              ...Article\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.GetLandingPageQueryDocument,
  "\n  query GetSolutionsQuery {\n    solution_All {\n      items {\n        ...Solution\n      }\n    }\n  }\n":
    types.GetSolutionsQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source:
    "\n  fragment Article on Article {\n    __typename\n    _system_ {\n      id\n      codename\n    }\n    title\n    introduction\n    bodyCopy {\n      html\n    }\n    publishDate_with_timezone {\n      display_timezone\n      value\n    }\n    image {\n      items {\n      ...Asset\n      }\n    }\n  }\n",
): typeof import("./graphql").ArticleFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment Asset on _Asset {\n    url\n    description\n    width\n    height\n    type\n    size\n  }\n",
): typeof import("./graphql").AssetFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source:
    "\n  fragment Event on Event {\n    __typename\n    _system_ {\n      id\n      codename\n    }\n    name\n    description {\n      html\n    }\n    startDate_with_timezone {\n      display_timezone\n      value\n    }\n    image {\n      items {\n        ...Asset\n      }\n    }\n    eventTopic {\n      items {\n        _system_ {\n          codename\n          name\n        }\n      }\n    }\n    eventType {\n      items {\n        _system_ {\n          codename\n          name\n        }\n      }\n    }\n    endDate_with_timezone {\n      display_timezone\n      value\n    }\n  }\n",
): typeof import("./graphql").EventFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source:
    "\n  fragment Solution on Solution {\n    __typename\n    _system_ {\n      id\n      codename\n    }\n    headline\n    introduction\n    image {\n      items {\n        ...Asset\n      }\n    }\n  }\n",
): typeof import("./graphql").SolutionFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source:
    "\n  fragment Video on Video {\n    _system_ {\n        id\n        codename\n      }\n      headline\n      description\n      videoLink\n      caption\n      autoplay {\n        items {\n          _system_ {\n            codename\n            name\n          }\n        }\n      }\n  }\n",
): typeof import("./graphql").VideoFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source:
    "\n  query GetLandingPageQuery {\n    landingPage_All(limit: 1) {\n      items {\n        _system_ {\n          id\n          name\n          codename\n        }\n        headline\n        subheadline\n        heroImage {\n          items {\n            ...Asset\n          }\n        }\n        bodyCopy {\n          html\n          components {\n            items {\n              ...Video\n            }\n          }\n        }\n        featuredContent {\n          items {\n            ... on Event {\n              ...Event\n            }\n            ... on Article {\n              ...Article\n            }\n          }\n        }\n      }\n    }\n  }\n",
): typeof import("./graphql").GetLandingPageQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source:
    "\n  query GetSolutionsQuery {\n    solution_All {\n      items {\n        ...Solution\n      }\n    }\n  }\n",
): typeof import("./graphql").GetSolutionsQueryDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
