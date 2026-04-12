import { cn } from "../../../lib/cn"
import type { GetFormQuery } from "@gfl/shared"

type Question = NonNullable<GetFormQuery["form"]>["questions"][number]

interface DateFieldProps {
    question: Question
    value: string
    onChange: (questionId: string, value: string) => void
}

export const DateField = ({ question, value, onChange }: DateFieldProps) => {
    return (
        <input
            type="date"
            value={value}
            onChange={(e) => onChange(question.id, e.target.value)}
            className={cn(
                "w-full rounded-xl border px-4 py-2.5 transition-all sm:w-auto",
                "focus:ring-2 focus:outline-none",
                "bg-slate-50 dark:bg-slate-800",
                "border-slate-200 dark:border-slate-700",
                "text-slate-700 dark:text-slate-200",
                "focus:border-purple-500 focus:ring-purple-500/20 dark:focus:border-purple-400",
                "[color-scheme:light] dark:[color-scheme:dark]",
            )}
        />
    )
}
