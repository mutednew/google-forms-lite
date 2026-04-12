import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "../../lib/cn"

interface SuccessStateProps {
    title?: string
    description?: string
    linkTo?: string
    linkLabel?: string
}

const SuccessState = ({
    title = "Success!",
    description = "Your action has been completed successfully.",
    linkTo = "/",
    linkLabel = "Go back",
}: SuccessStateProps) => {
    return (
        <div className="flex min-h-[80vh] items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className={cn(
                    "relative w-full max-w-md overflow-hidden rounded-3xl border p-10 text-center shadow-xl sm:p-12",
                    "bg-white dark:bg-slate-900",
                    "border-slate-200 dark:border-slate-800",
                )}
            >
                <div
                    className={cn(
                        "pointer-events-none absolute top-0 left-1/2 h-32 w-full -translate-x-1/2",
                        "bg-gradient-to-b from-green-500/10 to-transparent dark:from-green-500/5",
                    )}
                />

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2, duration: 0.5, bounce: 0.4 }}
                    className="mb-6 flex justify-center"
                >
                    <div
                        className={cn(
                            "flex h-20 w-20 items-center justify-center rounded-full",
                            "bg-green-50 dark:bg-green-500/10",
                        )}
                    >
                        <CheckCircle2 className="h-10 w-10 text-green-500" />
                    </div>
                </motion.div>

                <h2
                    className={cn(
                        "mb-2 text-2xl font-extrabold",
                        "text-slate-800 dark:text-slate-100",
                    )}
                >
                    {title}
                </h2>

                <p className="mb-8 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {description}
                </p>

                <Link
                    to={linkTo}
                    className={cn(
                        "inline-block rounded-full px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5",
                        "bg-slate-900 hover:bg-purple-600",
                        "dark:bg-purple-600 dark:hover:bg-purple-500",
                    )}
                >
                    {linkLabel}
                </Link>
            </motion.div>
        </div>
    )
}

export default SuccessState
