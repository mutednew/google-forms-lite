import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: '../../apps/server/src/schema.graphql',
    documents: '../../apps/client/src/**/*.graphql',
    ignoreNoDocuments: true,
    generates: {
        './src/generated.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typed-document-node',
            ],
        },
    },
}

export default config