import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FileText } from "lucide-react"
import { useHomePage } from "../../hooks/useHomePage"
import FormCard from "../../components/Home/FormCard"
import ErrorState from "../../components/ui/ErrorState"
import Skeleton from "../../components/ui/Skeleton"
import { cn } from "../../lib/cn"

const HomePage = () => {
    const { forms, isLoading, isError } = useHomePage()

    return (
        <div
            className={cn(
                "min-h-screen transition-colors duration-300",
                "bg-slate-50/50 dark:bg-slate-950",
                "selection:bg-purple-100 selection:text-purple-900",
                "dark:selection:bg-purple-900/30 dark:selection:text-purple-200",
            )}
        >
            <main className="mx-auto max-w-5xl px-6 py-10">
                <div className="mb-8 flex items-end justify-between">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <h1
                            className={cn(
                                "text-3xl font-extrabold tracking-tight transition-colors",
                                "text-slate-900 dark:text-white",
                            )}
                        >
                            My Forms
                        </h1>

                        {!isLoading && !isError && (
                            <p className="mt-2 text-sm font-medium text-slate-500 transition-colors dark:text-slate-400">
                                You have {forms.length} {forms.length === 1 ? "form" : "forms"}
                            </p>
                        )}
                    </motion.div>
                </div>

                {isLoading ? (
                    <div className="grid gap-5">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Skeleton
                                key={i}
                                className={cn(
                                    "h-28 w-full rounded-2xl border shadow-sm",
                                    "border-slate-100 bg-white/60",
                                    "dark:border-slate-800 dark:bg-slate-900/60",
                                )}
                            />
                        ))}
                    </div>
                ) : isError ? (
                    <ErrorState
                        title="Oops, something went wrong"
                        description="We couldn't load your forms. Please try refreshing the page."
                        linkLabel="Refresh page"
                        linkTo="/"
                    />
                ) : (
                    <AnimatePresence mode="wait">
                        {forms.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className={cn(
                                    "flex flex-col items-center justify-center px-4 py-20 text-center",
                                    "rounded-3xl border border-dashed transition-colors",
                                    "bg-white dark:bg-slate-900",
                                    "border-slate-200/60 dark:border-slate-800",
                                )}
                            >
                                <div
                                    className={cn(
                                        "mb-6 flex h-24 w-24 items-center justify-center rounded-full shadow-inner",
                                        "bg-gradient-to-tr from-purple-50 to-indigo-50",
                                        "dark:from-purple-500/10 dark:to-indigo-500/10",
                                    )}
                                >
                                    <FileText className="h-10 w-10 text-purple-400 dark:text-purple-500" />
                                </div>

                                <h2
                                    className={cn(
                                        "mb-2 text-2xl font-bold transition-colors",
                                        "text-slate-800 dark:text-slate-100",
                                    )}
                                >
                                    No forms created yet
                                </h2>

                                <p className="mb-8 max-w-sm text-slate-500 transition-colors dark:text-slate-400">
                                    Start collecting responses by creating your very first form. It
                                    only takes a few minutes!
                                </p>

                                <Link
                                    to="/forms/new"
                                    className={cn(
                                        "rounded-full px-8 py-3 font-semibold transition-all hover:-translate-y-0.5",
                                        "bg-purple-600 text-white hover:bg-purple-700",
                                        "shadow-md shadow-purple-200 dark:shadow-none",
                                    )}
                                >
                                    Create your first form
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.div key="list" className="grid gap-5">
                                {forms.map((form, index) => (
                                    <FormCard key={form.id} form={form} index={index} />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </main>
        </div>
    )
}

export default HomePage
