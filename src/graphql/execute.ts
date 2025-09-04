import type { TypedDocumentString } from './graphql'

const envId = import.meta.env.VITE_ENVIRONMENT_ID!
const hasKey = !!import.meta.env.VITE_DELIVERY_API_KEY
const endpoint = hasKey
  ? `https://preview-graphql.kontent.ai/${envId}`
  : `https://graphql.kontent.ai/${envId}`

 
export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json',
      ...(hasKey ? {
        Authorization: `Bearer ${import.meta.env.VITE_DELIVERY_API_KEY}`
      } : {})
    },
    body: JSON.stringify({
      query,
      variables
    })
  })
 
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
 
  return response.json() as unknown as {data: TResult}
}