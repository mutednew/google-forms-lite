import { QuestionType } from "@gfl/shared"
import type { GetFormQuery } from "@gfl/shared"
import { cn } from "../../../lib/cn"

type Form = NonNullable<GetFormQuery["form"]>
type Question = Form["questions"][number]
type Option = NonNullable<Question["options"]>[number]

interface ChoiceFieldProps {
    question: Question
    values: string[]
    onSingleChoice?: (questionId: string, value: string) => void
    onMultipleChoice?: (questionId: string, value: string, checked: boolean) => void
}

export const ChoiceField = ({
    question,
    values,
    onSingleChoice,
    onMultipleChoice,
}: ChoiceFieldProps) => {
    const isMulti = question.type === QuestionType.Checkbox

    return (
        <div className="flex flex-col gap-3">
            {question.options?.map((option: Option) => {
                const isChecked = isMulti ? values.includes(option.id) : values[0] === option.id

                return (
                    <label
                        key={option.id}
                        className={cn(
                            "group/label -ml-1 flex cursor-pointer items-start gap-3 rounded-lg p-1 transition-colors",
                            "hover:bg-slate-50 dark:hover:bg-slate-800/50",
                        )}
                    >
                        {isMulti ? (
                            <div
                                className={cn(
                                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border-2 transition-all duration-200",
                                    isChecked
                                        ? "border-purple-500 bg-purple-500 dark:border-purple-500 dark:bg-purple-500"
                                        : "border-slate-300 bg-transparent group-hover/label:border-purple-400 dark:border-slate-600 dark:group-hover/label:border-purple-500",
                                )}
                            >
                                <svg
                                    className={cn(
                                        "h-3.5 w-3.5 text-white transition-transform duration-200",
                                        isChecked ? "scale-100" : "scale-0",
                                    )}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        ) : (
                            <div className="relative mt-0.5 flex shrink-0 items-center justify-center">
                                <div
                                    className={cn(
                                        "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-200",
                                        isChecked
                                            ? "border-purple-500 dark:border-purple-400"
                                            : "border-slate-300 group-hover/label:border-purple-400 dark:border-slate-600 dark:group-hover/label:border-purple-500",
                                    )}
                                />

                                <div
                                    className={cn(
                                        "absolute h-2.5 w-2.5 rounded-full transition-transform duration-200",
                                        "bg-purple-500 dark:bg-purple-400",
                                        isChecked ? "scale-100" : "scale-0",
                                    )}
                                />
                            </div>
                        )}

                        <input
                            type={isMulti ? "checkbox" : "radio"}
                            name={question.id}
                            value={option.id}
                            checked={isChecked}
                            onChange={(e) => {
                                if (isMulti && onMultipleChoice) {
                                    onMultipleChoice(question.id, option.id, e.target.checked)
                                } else if (!isMulti && onSingleChoice) {
                                    onSingleChoice(question.id, option.id)
                                }
                            }}
                            className="sr-only"
                        />

                        <span
                            className={cn(
                                "text-base transition-colors",
                                isChecked
                                    ? "font-medium text-slate-900 dark:text-white"
                                    : "text-slate-700 dark:text-slate-300",
                            )}
                        >
                            {option.value}
                        </span>
                    </label>
                )
            })}
        </div>
    )
}
