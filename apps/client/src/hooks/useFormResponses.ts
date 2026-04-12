import { useCallback } from "react"
import { useParams } from "react-router-dom"
import { useGetFormQuery, useGetResponsesQuery } from "../store/api/api"

export const useFormResponses = () => {
    const { id } = useParams<{ id: string }>()

    const { data: formData, isLoading: isFormLoading } = useGetFormQuery({ id: id! })
    const { data: responsesData, isLoading: isResponsesLoading } = useGetResponsesQuery({
        formId: id!,
    })

    const questions = formData?.form?.questions

    const getQuestionTitle = useCallback(
        (questionId: string): string => {
            return questions?.find((q) => q.id === questionId)?.title ?? "Unknown question"
        },
        [questions],
    )

    const getOptionValue = useCallback(
        (questionId: string, optionId: string): string => {
            const question = questions?.find((q) => q.id === questionId)
            return question?.options?.find((o) => o.id === optionId)?.value ?? optionId
        },
        [questions],
    )

    return {
        form: formData?.form,
        responses: responsesData?.responses ?? [],
        isLoading: isFormLoading || isResponsesLoading,
        getQuestionTitle,
        getOptionValue,
    }
}
