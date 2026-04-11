import { useState } from "react"
import { useParams } from "react-router-dom"
import { QuestionType } from "@gfl/shared"
import { useGetFormQuery, useSubmitResponseMutation } from "../store/api/api";

export interface AnswerState {
    [questionId: string]: string[]
}

export const useFormFiller = () => {
    const { id } = useParams<{ id: string }>()
    const { data, isLoading, isError } = useGetFormQuery({ id: id! })
    const [submitResponse, { isLoading: isSubmitting }] = useSubmitResponseMutation()

    const [answers, setAnswers] = useState<AnswerState>({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const handleTextChange = (questionId: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: [value] }))
    }

    const handleSingleChoice = (questionId: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: [value] }))
    }

    const handleMultipleChoice = (questionId: string, value: string, checked: boolean) => {
        setAnswers((prev) => {
            const current = prev[questionId] ?? []
            return {
                ...prev,
                [questionId]: checked
                    ? [...current, value]
                    : current.filter((v) => v !== value),
            }
        })
    }

    const validateAnswers = (): boolean => {
        const form = data?.form
        if (!form) return false

        return form.questions.every((question) => {
            if (!question.required) return true
            const answer = answers[question.id] ?? []
            if (question.type === QuestionType.Text || question.type === QuestionType.Date) {
                return answer[0]?.trim().length > 0
            }
            return answer.length > 0
        })
    }

    const handleSubmit = async () => {
        if (!id || !validateAnswers()) return

        setSubmitError(null)

        try {
            await submitResponse({
                formId: id,
                answers: Object.entries(answers).map(([questionId, values]) => ({
                    questionId,
                    values,
                })),
            }).unwrap()

            setIsSubmitted(true)
        } catch (e) {
            setSubmitError("Failed to submit. Please try again.")
        }
    }

    return {
        form: data?.form,
        isLoading,
        isError,
        isSubmitting,
        isSubmitted,
        submitError,
        answers,
        handleTextChange,
        handleSingleChoice,
        handleMultipleChoice,
        handleSubmit,
        isValid: validateAnswers(),
    }
}