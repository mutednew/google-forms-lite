import { memo } from "react"
import { QuestionType } from "@gfl/shared"
import type { GetFormQuery } from "@gfl/shared"
import { cn } from "../../lib/cn"
import { TextField } from "./fields/TextField"
import { DateField } from "./fields/DateField"
import { ChoiceField } from "./fields/ChoiceField"

type Form = NonNullable<GetFormQuery["form"]>
type Question = Form["questions"][number]

interface QuestionFieldProps {
    question: Question
    values: string[]
    onTextChange: (questionId: string, value: string) => void
    onSingleChoice: (questionId: string, value: string) => void
    onMultipleChoice: (questionId: string, value: string, checked: boolean) => void
}

const QuestionField = memo(
    ({ question, values, onTextChange, onSingleChoice, onMultipleChoice }: QuestionFieldProps) => {
        return (
            <div
                className={cn(
                    "group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 sm:p-8",
                    "bg-white dark:bg-slate-900",
                    "border-slate-200 dark:border-slate-800",
                    "shadow-sm focus-within:shadow-md",
                    "focus-within:border-purple-300 dark:focus-within:border-purple-500/50",
                )}
            >
                <div
                    className={cn(
                        "absolute top-0 bottom-0 left-0 w-1.5 bg-purple-500",
                        "opacity-0 transition-opacity duration-300 group-focus-within:opacity-100",
                    )}
                />

                <div className="mb-5">
                    <p
                        className={cn(
                            "text-base leading-snug font-semibold sm:text-lg",
                            "text-slate-800 dark:text-slate-100",
                        )}
                    >
                        {question.title}

                        {question.required && (
                            <span
                                className="ml-1.5 text-red-500 dark:text-red-400"
                                title="This question is required"
                            >
                                *
                            </span>
                        )}
                    </p>
                </div>

                {question.type === QuestionType.Text && (
                    <TextField
                        question={question}
                        value={values[0] ?? ""}
                        onChange={onTextChange}
                    />
                )}

                {question.type === QuestionType.Date && (
                    <DateField
                        question={question}
                        value={values[0] ?? ""}
                        onChange={onTextChange}
                    />
                )}

                {(question.type === QuestionType.MultipleChoice ||
                    question.type === QuestionType.Checkbox) && (
                    <ChoiceField
                        question={question}
                        values={values}
                        onSingleChoice={onSingleChoice}
                        onMultipleChoice={onMultipleChoice}
                    />
                )}
            </div>
        )
    },
    (prevProps, nextProps) => {
        if (prevProps.question.id !== nextProps.question.id) return false

        if (prevProps.values.length !== nextProps.values.length) return false
        for (let i = 0; i < prevProps.values.length; i++) {
            if (prevProps.values[i] !== nextProps.values[i]) return false
        }

        return true
    },
)

export default QuestionField
