import { CodegenConfig } from '@graphql-codegen/cli'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

const getGraphQLEndpoint = () => {
  const environmentId = process.env.VITE_ENVIRONMENT_ID
  const hasApiKey = !!process.env.VITE_DELIVERY_API_KEY
  
  if (!environmentId) {
    throw new Error('VITE_ENVIRONMENT_ID is required')
  }
  
  return hasApiKey 
    ? `https://preview-graphql.kontent.ai/${environmentId}`
    : `https://graphql.kontent.ai/${environmentId}`
}

const config: CodegenConfig = {
  schema: {
    [getGraphQLEndpoint()]: {
      headers: {
        ...(process.env.VITE_DELIVERY_API_KEY && {
          Authorization: `Bearer ${process.env.VITE_DELIVERY_API_KEY}`
        })
      }
    }
  },
  documents: ['src/**/*.{ts,tsx,graphql,gql}'],
  generates: {
    './src/graphql/': {
      preset: 'client',
      config: {
        documentMode: 'string',
        strictScalars: true,          // Enforce strict scalar types
        defaultScalarType: 'unknown', // Prevent 'any' types
        scalars: {
          DateTime: 'string',         // Handle Kontent.ai DateTime scalar
          RichText: 'string',         // Handle Kontent.ai RichText scalar
          Guid: 'string',             // Handle Kontent.ai Guid scalar
        },
        useTypeImports: true,         // Use type-only imports for better tree shaking
        nonOptionalTypename: true,    // Always include __typename
        skipTypename: false,          // Include typename for runtime type checking
        enumsAsTypes: true,           // Generate enums as union types for better type safety
        constEnums: false,            // Use const assertions instead of const enums
        namingConvention: {           // Ensure codename-based naming
          typeNames: 'change-case-all#pascalCase',
          enumValues: 'keep'
        }
      },
      presetConfig: {
        fragmentMasking: false,       // Disable fragment masking for direct type access
        gqlTagName: 'graphql'         // Use 'graphql' tag for queries
      }
    },
  },
  hooks: {
    afterAllFileWrite: [
      'npm run fmt'
    ]
  }
}

export default config