import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FileText, PenLine, BarChart2, CalendarDays } from "lucide-react"
import type { GetFormsQuery } from "@gfl/shared"
import { cn } from "../../lib/cn"

type Form = GetFormsQuery["forms"][number]

interface FormCardProps {
    form: Form
    index: number
}

const FormCard = ({ form, index }: FormCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
            className={cn(
                "group relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl border p-6 transition-all duration-300 sm:flex-row sm:items-center",
                "bg-white dark:bg-slate-900",
                "border-slate-200 dark:border-slate-800",
                "shadow-sm hover:shadow-md",
                "hover:border-purple-200 dark:hover:border-purple-500/50",
            )}
        >
            <div
                className={cn(
                    "absolute top-0 bottom-0 left-0 w-1.5 -translate-x-full transform bg-purple-500",
                    "transition-transform duration-300 ease-out group-hover:translate-x-0",
                )}
            />

            <div className="flex items-start gap-5 sm:items-center">
                <div
                    className={cn(
                        "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border transition-colors duration-300",
                        "border-purple-100 bg-purple-50/50 group-hover:bg-purple-100",
                        "dark:border-purple-500/20 dark:bg-purple-500/10 dark:group-hover:bg-purple-500/20",
                    )}
                >
                    <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>

                <div>
                    <h2
                        className={cn(
                            "line-clamp-1 text-lg font-bold transition-colors",
                            "text-slate-800 group-hover:text-purple-700",
                            "dark:text-slate-100 dark:group-hover:text-purple-400",
                        )}
                    >
                        {form.title}
                    </h2>

                    {form.description && (
                        <p
                            className={cn(
                                "mt-1 line-clamp-1 max-w-xl text-sm transition-colors",
                                "text-slate-500 dark:text-slate-400",
                            )}
                        >
                            {form.description}
                        </p>
                    )}

                    <div
                        className={cn(
                            "mt-2 flex items-center gap-1.5 text-xs font-medium transition-colors",
                            "text-slate-400 dark:text-slate-500",
                        )}
                    >
                        <CalendarDays className="h-3.5 w-3.5" />
                        <span>
                            {new Date(form.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex w-full flex-shrink-0 flex-wrap gap-3 sm:w-auto sm:flex-nowrap">
                <Link
                    to={`/forms/${form.id}/fill`}
                    className={cn(
                        "flex flex-1 items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-200 sm:flex-none",
                        "focus:ring-2 focus:outline-none",
                        "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 focus:ring-slate-200",
                        "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white dark:focus:ring-slate-700",
                    )}
                >
                    <PenLine className="h-4 w-4" />
                    Fill
                </Link>

                <Link
                    to={`/forms/${form.id}/responses`}
                    className={cn(
                        "flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 sm:flex-none",
                        "focus:ring-2 focus:outline-none",
                        "bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-800 focus:ring-purple-200",
                        "dark:bg-purple-500/10 dark:text-purple-400 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 dark:focus:ring-purple-500/30",
                    )}
                >
                    <BarChart2 className="h-4 w-4" />
                    Responses
                </Link>
            </div>
        </motion.div>
    )
}

export default FormCard
