import { randomUUID } from "crypto"

export interface Option {
    id: string;
    value: string;
}

export interface Question {
    id: string;
    title: string;
    type: "TEXT" | "MULTIPLE_CHOICE" | "CHECKBOX" | "DATE";
    required: boolean;
    options?: Option[];
}

export interface Form {
    id: string;
    title: string;
    description?: string;
    questions: Question[];
    createdAt: string;
}

export interface Answer {
    questionId: string;
    values: string[];
}

export interface Response {
    id: string
    formId: string
    answers: Answer[]
    submittedAt: string
}

export interface OptionInput {
    value: string;
}

export interface QuestionInput {
    title: string;
    type: "TEXT" | "MULTIPLE_CHOICE" | "CHECKBOX" | "DATE";
    required: boolean;
    options?: OptionInput[];
}

export interface AnswerInput {
    questionId: string;
    values: string[];
}

const forms: Form[] = [];
const responses: Response[] = [];

export const db = {
    getForms: (): Form[] => forms,

    getFormById: (id: string): Form | undefined => forms.find((f) => f.id === id),

    createForm: (title: string, description: string | undefined, questions: QuestionInput[]): Form => {
        const form: Form = {
            id: randomUUID(),
            title,
            description,
            questions: questions.map((q) => ({
                id: randomUUID(),
                title: q.title,
                type: q.type,
                required: q.required,
                options: q.options?.map((o) => ({
                    id: randomUUID(),
                    value: o.value,
                }))
            })),
            createdAt: new Date().toISOString(),
        }
        forms.push(form);
        return form;
    },

    getResponsesByFormId: (formId: string): Response[] => responses.filter((r) => r.formId === formId),

    submitResponse: (formId: string, answers: AnswerInput[]): Response => {
        const form = forms.find((f) => f.id === formId)
        if (!form) throw new Error(`Form with id "${formId}" not found`)

        const response: Response = {
            id: randomUUID(),
            formId,
            answers,
            submittedAt: new Date().toISOString(),
        }
        responses.push(response)
        return response
    }
}