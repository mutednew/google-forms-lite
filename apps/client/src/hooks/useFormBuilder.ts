import type { FormBuilderState, LocalQuestion } from "../types/formBuilder.types";
import { QuestionType } from "@gfl/shared";
import { useNavigate } from "react-router-dom";
import { useCreateFormMutation } from "../store/api/api";
import { useState } from "react";

const generateId = () => crypto.randomUUID();

const createEmptyQuestion = (): LocalQuestion => ({
    id: generateId(),
    title: "",
    type: QuestionType.Text,
    required: false,
    options: [],
});

export const useFormBuilder = () => {
    const navigate = useNavigate();
    const [createForm, { isLoading }] = useCreateFormMutation();

    const [state, setState] = useState<FormBuilderState>({ title: "", description: "", questions: [] });

    const setTitle = (title: string) =>
        setState((prev) => ({
            ...prev, title
        }));

    const setDescription = (description: string) =>
        setState((prev) => ({
            ...prev, description
        }));

    const addQuestion = () =>
        setState((prev) => ({
            ...prev, questions: [...prev.questions, createEmptyQuestion()]
        }));

    const removeQuestion = (id: string) =>
        setState((prev) => ({
            ...prev, questions: prev.questions.filter(q => q.id !== id)
        }));

    const updateQuestion = (id: string, changes: Partial<LocalQuestion>) =>
        setState((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === id ? { ...q, ...changes } : q
            )
        }));

    const addOption = (questionId: string) =>
        setState((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === questionId
                    ? { ...q, options: [...q.options, { id: generateId(), value: "" }] }
                    : q
            ),
        }));

    const updateOption = (questionId: string, optionId: string, value: string) =>
        setState((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === questionId
                    ? {
                        ...q,
                        options: q.options.map((o) =>
                            o.id === optionId ? { ...o, value } : o
                        ),
                    }
                    : q
            ),
        }));

    const removeOption = (questionId: string, optionId: string) =>
        setState((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === questionId
                    ? { ...q, options: q.options.filter((o) => o.id !== optionId) }
                    : q
            ),
        }));

    const handleSubmit = async () => {
        if (!state.title.trim()) {
            return;
        }

        try {
            const result = await createForm({
                title: state.title,
                description: state.description || undefined,
                questions: state.questions.map((q) => ({
                    title: q.title,
                    type: q.type,
                    required: q.required,
                    options: q.options.length > 0
                        ? q.options.map((o) => ({ value: o.value }))
                        : undefined
                }))
            }).unwrap();

            navigate(`/forms/${result.createForm.id}/fill`);
        } catch (e) {
            console.error("Failed to create form", e);
        }
    };

    return {
        state,
        isLoading,
        setTitle,
        setDescription,
        addQuestion,
        removeQuestion,
        updateQuestion,
        addOption,
        updateOption,
        removeOption,
        handleSubmit,
    };
}