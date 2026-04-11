import { QuestionType } from "@gfl/shared";

export interface LocalOption {
    id: string
    value: string
}

export interface LocalQuestion {
    id: string
    title: string
    type: QuestionType
    required: boolean
    options: LocalOption[]
}

export interface FormBuilderState {
    title: string
    description: string
    questions: LocalQuestion[]
}