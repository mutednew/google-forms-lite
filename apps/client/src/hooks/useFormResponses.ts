import { useParams } from "react-router-dom";
import {useGetFormQuery, useGetResponsesQuery} from "../store/api/api";

export const useFormResponses = () => {
    const { id } = useParams<{ id: string }>();

    const { data: formData, isLoading: isFormLoading } = useGetFormQuery({ id: id! });
    const { data: responsesData, isLoading: isResponsesLoading } = useGetResponsesQuery({ formId: id! });

    const getQuestionTitle = (questionId: string): string => {
        return formData?.form?.questions.find((q) => q.id === questionId)?.title ?? "Unknown question";
    };

    const getOptionValue = (questionId: string, optionId: string): string => {
        const question = formData?.form?.questions.find((q) => q.id === questionId)

        return question?.options?.find((o) => o.id === optionId)?.value ?? optionId;
    };

    return {
        form: formData?.form,
        responses: responsesData?.responses ?? [],
        isLoading: isFormLoading || isResponsesLoading,
        getQuestionTitle,
        getOptionValue,
    };
};