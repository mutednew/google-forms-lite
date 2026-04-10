import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: '../server/src/schema.graphql',
    documents: '../client/src/**/*.graphql',
    generates: {
        './src/generated.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-rtk-query',
            ],
            config: {
                importBaseApiFrom: '@gfl/client/src/store/api/baseApi',
                exportHooks: true,
            },
        },
    },
}

export default config