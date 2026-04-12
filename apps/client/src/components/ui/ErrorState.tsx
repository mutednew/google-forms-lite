import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { cn } from "../../lib/cn"

interface ErrorStateProps {
    title?: string
    description?: string
    linkTo?: string
    linkLabel?: string
}

const ErrorState = ({
    title = "Something went wrong",
    description = "Please try again later.",
    linkTo = "/",
    linkLabel = "Go back home",
}: ErrorStateProps) => {
    return (
        <div className="flex min-h-[60vh] items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                    "flex w-full max-w-sm flex-col items-center text-center",
                    "rounded-3xl border p-8 shadow-sm",
                    "bg-red-50 dark:bg-red-500/10",
                    "border-red-100 dark:border-red-500/20",
                )}
            >
                <AlertCircle className="mb-4 h-12 w-12 text-red-400 dark:text-red-500" />

                <h2 className="mb-2 text-xl font-bold text-red-800 dark:text-red-400">{title}</h2>

                <p className="mb-6 text-sm text-red-600/80 dark:text-red-400/80">{description}</p>

                <Link
                    to={linkTo}
                    className={cn(
                        "w-full rounded-full px-6 py-2.5 text-center text-sm font-medium transition-colors",
                        "bg-red-100 text-red-700 hover:bg-red-200",
                        "dark:bg-red-500/20 dark:text-red-300 dark:hover:bg-red-500/30",
                    )}
                >
                    {linkLabel}
                </Link>
            </motion.div>
        </div>
    )
}

export default ErrorState
