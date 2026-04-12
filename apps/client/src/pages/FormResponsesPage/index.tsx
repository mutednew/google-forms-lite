import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, FileSpreadsheet } from "lucide-react"
import { useFormResponses } from "../../hooks/useFormResponses"
import ResponseCard from "../../components/FormResponses/ResponseCard"
import Skeleton from "../../components/ui/Skeleton"
import ErrorState from "../../components/ui/ErrorState"
import { cn } from "../../lib/cn"

const FormResponsesPage = () => {
    const { form, responses, isLoading, getQuestionTitle, getOptionValue } = useFormResponses()

    if (isLoading) {
        return (
            <div className="pb-20">
                <div className="mx-auto max-w-3xl px-6 py-10">
                    <Skeleton
                        className={cn(
                            "mb-8 h-40 w-full rounded-2xl border shadow-sm",
                            "border-slate-100 bg-white/60",
                            "dark:border-slate-800 dark:bg-slate-900/60",
                        )}
                    />

                    <div className="flex flex-col gap-6">
                        {[1, 2, 3].map((i) => (
                            <Skeleton
                                key={i}
                                className={cn(
                                    "h-48 w-full rounded-2xl border shadow-sm",
                                    "border-slate-100 bg-white/60",
                                    "dark:border-slate-800 dark:bg-slate-900/60",
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (!form) {
        return (
            <ErrorState
                title="Form not found"
                description="We couldn't load the responses for this form."
            />
        )
    }

    return (
        <div className="pb-20">
            <div className="mx-auto max-w-3xl px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                        "relative mb-8 overflow-hidden rounded-2xl border p-8 shadow-sm transition-colors",
                        "border-t-8 border-t-purple-500 dark:border-t-purple-600",
                        "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
                    )}
                >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                        <div>
                            <h1
                                className={cn(
                                    "text-3xl font-extrabold tracking-tight",
                                    "text-slate-900 dark:text-white",
                                )}
                            >
                                {form.title}
                            </h1>

                            {form.description && (
                                <p className="mt-2 text-base leading-relaxed text-slate-500 dark:text-slate-400">
                                    {form.description}
                                </p>
                            )}
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            <div
                                className={cn(
                                    "flex items-center gap-2 rounded-xl border px-4 py-2 font-bold shadow-sm",
                                    "border-purple-100 bg-purple-50 text-purple-700",
                                    "dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-300",
                                )}
                            >
                                <FileSpreadsheet className="h-4 w-4" />
                                {responses.length}{" "}
                                {responses.length === 1 ? "response" : "responses"}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {responses.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={cn(
                                "flex flex-col items-center justify-center rounded-3xl border border-dashed px-4 py-20 text-center transition-colors",
                                "border-slate-200/60 bg-white dark:border-slate-800 dark:bg-slate-900",
                            )}
                        >
                            <div
                                className={cn(
                                    "mb-6 flex h-24 w-24 items-center justify-center rounded-full shadow-inner",
                                    "bg-gradient-to-tr from-purple-50 to-indigo-50",
                                    "dark:from-purple-500/10 dark:to-indigo-500/10",
                                )}
                            >
                                <MessageSquare className="h-10 w-10 text-purple-400 dark:text-purple-500" />
                            </div>

                            <h2
                                className={cn(
                                    "mb-2 text-2xl font-bold",
                                    "text-slate-800 dark:text-slate-100",
                                )}
                            >
                                Waiting for responses
                            </h2>

                            <p className="mb-8 max-w-sm text-slate-500 dark:text-slate-400">
                                Share the form link with your audience. Their answers will
                                automatically appear here.
                            </p>

                            <Link
                                to={`/forms/${form.id}/fill`}
                                className={cn(
                                    "rounded-full px-8 py-3 font-semibold transition-all hover:-translate-y-0.5",
                                    "bg-purple-600 text-white hover:bg-purple-700",
                                    "shadow-md shadow-purple-200 dark:shadow-none",
                                )}
                            >
                                Submit a test response
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.div key="list" className="flex flex-col gap-6">
                            {responses.map((response, index) => (
                                <ResponseCard
                                    key={response.id}
                                    response={response}
                                    index={index}
                                    getQuestionTitle={getQuestionTitle}
                                    getOptionValue={getOptionValue}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default FormResponsesPage
