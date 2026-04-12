import { memo } from "react"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import type { GetResponsesQuery } from "@gfl/shared"
import { cn } from "../../lib/cn"

type Response = GetResponsesQuery["responses"][number]

interface ResponseCardProps {
    response: Response
    index: number
    getQuestionTitle: (questionId: string) => string
    getOptionValue: (questionId: string, optionId: string) => string
}

const ResponseCard = memo(
    ({ response, index, getQuestionTitle, getOptionValue }: ResponseCardProps) => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={cn(
                    "group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 sm:p-8",
                    "bg-white dark:bg-slate-900",
                    "border-slate-200 dark:border-slate-800",
                    "shadow-sm hover:shadow-md",
                )}
            >
                <div
                    className={cn(
                        "absolute top-0 bottom-0 left-0 w-1 opacity-0 transition-opacity",
                        "bg-slate-200 dark:bg-slate-700",
                        "group-hover:opacity-100",
                    )}
                />

                <div
                    className={cn(
                        "mb-6 flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center",
                        "border-slate-100 dark:border-slate-800/80",
                    )}
                >
                    <div className="flex items-center gap-4">
                        <div
                            className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm",
                                "bg-gradient-to-br from-purple-500 to-purple-600",
                                "shadow-purple-200 dark:shadow-none",
                            )}
                        >
                            <span className="text-sm font-black text-white">#{index + 1}</span>
                        </div>

                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                            Response
                        </h3>
                    </div>

                    <div
                        className={cn(
                            "flex w-fit items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium",
                            "bg-slate-50 dark:bg-slate-800",
                            "border-slate-100 dark:border-slate-700",
                            "text-slate-500 dark:text-slate-400",
                        )}
                    >
                        <Clock className="h-3.5 w-3.5" />

                        {new Date(response.submittedAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    {response.answers.map((answer, i) => {
                        const answerValues = answer.values.map((v) =>
                            getOptionValue(answer.questionId, v),
                        )
                        const isAnswerEmpty = answerValues.length === 0 || answerValues[0] === ""

                        return (
                            <div
                                key={answer.questionId}
                                className={cn(
                                    "group/answer border-l-2 pl-3 transition-colors",
                                    "border-slate-100 dark:border-slate-800",
                                    "hover:border-purple-300 dark:hover:border-purple-500/50",
                                )}
                            >
                                <div className="mb-1.5 flex items-start gap-2">
                                    <span className="mt-0.5 text-[10px] font-bold text-slate-400 dark:text-slate-500">
                                        Q{i + 1}
                                    </span>

                                    <p className="text-sm leading-snug font-semibold text-slate-600 dark:text-slate-300">
                                        {getQuestionTitle(answer.questionId)}
                                    </p>
                                </div>

                                {isAnswerEmpty ? (
                                    <p className="pl-6 text-base text-slate-400 italic dark:text-slate-500">
                                        Not answered
                                    </p>
                                ) : (
                                    <p className="pl-6 text-base leading-relaxed font-medium text-slate-900 dark:text-slate-100">
                                        {answerValues.join(", ")}
                                    </p>
                                )}
                            </div>
                        )
                    })}
                </div>
            </motion.div>
        )
    },
)

export default ResponseCard
