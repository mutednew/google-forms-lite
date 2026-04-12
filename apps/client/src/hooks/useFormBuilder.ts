import { useCallback, useState } from "react"
import type { FormBuilderState, LocalQuestion } from "../types/formBuilder.types"
import { QuestionType } from "@gfl/shared"
import { useNavigate } from "react-router-dom"
import { useCreateFormMutation } from "../store/api/api"
import { arrayMove } from "@dnd-kit/sortable"

const generateId = () => crypto.randomUUID()

const createEmptyQuestion = (): LocalQuestion => ({
    id: generateId(),
    title: "",
    type: QuestionType.Text,
    required: false,
    options: [],
})

export const useFormBuilder = () => {
    const navigate = useNavigate()
    const [createForm, { isLoading }] = useCreateFormMutation()

    const [state, setState] = useState<FormBuilderState>({
        title: "",
        description: "",
        questions: [],
    })

    const setTitle = useCallback((title: string) => {
        setState((prev) => ({ ...prev, title }))
    }, [])

    const setDescription = useCallback((description: string) => {
        setState((prev) => ({ ...prev, description }))
    }, [])

    const addQuestion = useCallback(() => {
        setState((prev) => ({
            ...prev,
            questions: [...prev.questions, createEmptyQuestion()],
        }))
    }, [])

    const removeQuestion = useCallback((id: string) => {
        setState((prev) => ({
            ...prev,
            questions: prev.questions.filter((q) => q.id !== id),
        }))
    }, [])

    const updateQuestion = useCallback((id: string, changes: Partial<LocalQuestion>) => {
        setState((prev) => ({
            ...prev,
            questions: prev.questions.map((q) => (q.id === id ? { ...q, ...changes } : q)),
        }))
    }, [])

    const reorderQuestions = useCallback((activeId: string, overId: string) => {
        setState((prev) => {
            const oldIndex = prev.questions.findIndex((q) => q.id === activeId)
            const newIndex = prev.questions.findIndex((q) => q.id === overId)
            return {
                ...prev,
                questions: arrayMove(prev.questions, oldIndex, newIndex),
            }
        })
    }, [])

    const addOption = useCallback((questionId: string) => {
        setState((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === questionId
                    ? { ...q, options: [...q.options, { id: generateId(), value: "" }] }
                    : q,
            ),
        }))
    }, [])

    const updateOption = useCallback((questionId: string, optionId: string, value: string) => {
        setState((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === questionId
                    ? {
                          ...q,
                          options: q.options.map((o) => (o.id === optionId ? { ...o, value } : o)),
                      }
                    : q,
            ),
        }))
    }, [])

    const removeOption = useCallback((questionId: string, optionId: string) => {
        setState((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === questionId
                    ? { ...q, options: q.options.filter((o) => o.id !== optionId) }
                    : q,
            ),
        }))
    }, [])

    const handleSubmit = useCallback(async () => {
        if (!state.title.trim()) {
            return
        }

        try {
            const result = await createForm({
                title: state.title,
                description: state.description || undefined,
                questions: state.questions.map((q) => ({
                    title: q.title,
                    type: q.type,
                    required: q.required,
                    options:
                        q.options.length > 0
                            ? q.options.map((o) => ({ value: o.value }))
                            : undefined,
                })),
            }).unwrap()

            navigate(`/forms/${result.createForm.id}/fill`)
        } catch (e) {
            console.error("Failed to create form:", e)
        }
    }, [state, createForm, navigate])

    return {
        state,
        isLoading,
        setTitle,
        setDescription,
        addQuestion,
        removeQuestion,
        updateQuestion,
        reorderQuestions,
        addOption,
        updateOption,
        removeOption,
        handleSubmit,
    }
}
