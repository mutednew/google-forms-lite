import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"
import {
    CreateFormDocument,
    CreateFormMutation,
    CreateFormMutationVariables,
    GetFormDocument,
    GetFormQuery,
    GetFormQueryVariables,
    GetFormsDocument,
    GetFormsQuery,
    GetResponsesDocument,
    GetResponsesQuery,
    GetResponsesQueryVariables,
    SubmitResponseDocument,
    SubmitResponseMutation,
    SubmitResponseMutationVariables,
} from "@gfl/shared"

export const api = createApi({
    reducerPath: "api",
    baseQuery: graphqlRequestBaseQuery({
        url: "http://localhost:5000/graphql",
    }),
    endpoints: (build) => ({
        getForms: build.query<GetFormsQuery, void>({
            query: () => ({ document: GetFormsDocument })
        }),

        getForm: build.query<GetFormQuery, GetFormQueryVariables>({
            query: (variables) => ({ document: GetFormDocument, variables }),
        }),

        createForm: build.mutation<CreateFormMutation, CreateFormMutationVariables>({
            query: (variables) => ({ document: CreateFormDocument, variables })
        }),

        getResponses: build.query<GetResponsesQuery, GetResponsesQueryVariables>({
            query: (variables) => ({ document: GetResponsesDocument, variables })
        }),

        submitResponse: build.mutation<SubmitResponseMutation, SubmitResponseMutationVariables>({
            query: (variables) => ({ document: SubmitResponseDocument, variables })
        }),
    }),
});

export const {
    useGetFormsQuery,
    useGetFormQuery,
    useCreateFormMutation,
    useGetResponsesQuery,
    useSubmitResponseMutation,
} = api;