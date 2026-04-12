import { cn } from "../../../lib/cn"
import type { GetFormQuery } from "@gfl/shared"

type Question = NonNullable<GetFormQuery["form"]>["questions"][number]

interface TextFieldProps {
    question: Question
    value: string
    onChange: (questionId: string, value: string) => void
}

export const TextField = ({ question, value, onChange }: TextFieldProps) => {
    return (
        <div className="relative">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(question.id, e.target.value)}
                placeholder="Your answer"
                className={cn(
                    "w-full pb-2 transition-colors focus:outline-none sm:w-2/3",
                    "border-b-2 bg-transparent",
                    "border-slate-200 dark:border-slate-700",
                    "text-slate-900 dark:text-white",
                    "placeholder-slate-400 dark:placeholder-slate-500",
                    "focus:border-purple-500 dark:focus:border-purple-400",
                )}
            />
        </div>
    )
}
