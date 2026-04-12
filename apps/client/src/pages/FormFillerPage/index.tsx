import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { useFormFiller } from "../../hooks/useFormFiller"
import QuestionField from "../../components/FormFiller/QuestionField"
import Skeleton from "../../components/ui/Skeleton"
import ErrorState from "../../components/ui/ErrorState"
import { cn } from "../../lib/cn"
import SuccessState from "../../components/ui/SuccessState"

const FormFillerPage = () => {
    const {
        form,
        isLoading,
        isError,
        isSubmitting,
        isSubmitted,
        submitError,
        answers,
        handleTextChange,
        handleSingleChoice,
        handleMultipleChoice,
        handleSubmit,
        isValid,
    } = useFormFiller()

    if (isLoading) {
        return (
            <div className="pb-20">
                <div className="mx-auto max-w-3xl px-6 py-10">
                    <Skeleton
                        className={cn(
                            "mb-6 h-32 w-full rounded-2xl border shadow-sm",
                            "border-slate-100 bg-white/60",
                            "dark:border-slate-800 dark:bg-slate-900/60",
                        )}
                    />

                    <div className="flex flex-col gap-5">
                        {[1, 2].map((i) => (
                            <Skeleton
                                key={i}
                                className={cn(
                                    "h-40 w-full rounded-2xl border shadow-sm",
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

    if (isError || !form) {
        return (
            <ErrorState
                title="Form not found"
                description="The form you are looking for doesn't exist or has been removed."
            />
        )
    }

    if (isSubmitted) {
        return (
            <SuccessState
                title="Response submitted!"
                description="Your response has been recorded successfully. Thank you for your time!"
                linkTo="/"
                linkLabel="Back to forms"
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
                        "mb-6 rounded-2xl border p-8 shadow-sm transition-colors",
                        "border-t-8 border-t-purple-500 dark:border-t-purple-600",
                        "bg-white dark:bg-slate-900",
                        "border-slate-200 dark:border-slate-800",
                    )}
                >
                    <h1
                        className={cn(
                            "text-3xl font-extrabold tracking-tight",
                            "text-slate-900 dark:text-white",
                        )}
                    >
                        {form.title}
                    </h1>

                    {form.description && (
                        <p className="mt-3 text-base leading-relaxed text-slate-500 dark:text-slate-400">
                            {form.description}
                        </p>
                    )}

                    <div className="mt-6 border-t border-slate-100 pt-6 dark:border-slate-800">
                        <p className="text-xs font-medium text-red-500 dark:text-red-400">
                            * Indicates required question
                        </p>
                    </div>
                </motion.div>

                <div className="mb-8 flex flex-col gap-5">
                    {form.questions.map((question, index) => (
                        <motion.div
                            key={question.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                            <QuestionField
                                question={question}
                                values={answers[question.id] ?? []}
                                onTextChange={handleTextChange}
                                onSingleChoice={handleSingleChoice}
                                onMultipleChoice={handleMultipleChoice}
                            />
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {submitError && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            className="mb-6 overflow-hidden"
                        >
                            <div
                                className={cn(
                                    "flex items-center gap-2 rounded-xl border p-4 text-sm font-medium",
                                    "bg-red-50 dark:bg-red-500/10",
                                    "text-red-600 dark:text-red-400",
                                    "border-red-100 dark:border-red-500/20",
                                )}
                            >
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                {submitError}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-center justify-between">
                    <motion.button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !isValid}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                            "flex min-w-[140px] justify-center rounded-full px-8 py-3 font-semibold text-white transition-all",
                            "bg-purple-600 shadow-md shadow-purple-200 hover:bg-purple-700 hover:shadow-lg dark:shadow-none",
                            "disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none dark:disabled:bg-slate-800",
                        )}
                    >
                        {isSubmitting ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        ) : (
                            "Submit"
                        )}
                    </motion.button>

                    <button
                        onClick={() => window.location.reload()}
                        className="text-sm font-medium text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
                    >
                        Clear form
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FormFillerPage
