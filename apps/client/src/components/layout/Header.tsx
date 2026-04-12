import { Link } from "react-router-dom"
import { FileText, Plus, ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"
import type { HeaderProps } from "../../types/header.types"
import { useHeader } from "../../hooks/useHeader"
import ThemeToggle from "../ui/ThemeToggle"
import { cn } from "../../lib/cn" // Убедись, что путь к cn.ts правильный

const Header = ({ onSave, isSaving, canSave }: HeaderProps) => {
    const { isHome, isFormBuilder } = useHeader()

    return (
        <header
            className={cn(
                "sticky top-0 z-20 backdrop-blur-md transition-all duration-300",
                "border-b border-slate-200/80 bg-white/80",
                "dark:border-slate-800/80 dark:bg-slate-900/80",
            )}
        >
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    {!isHome && (
                        <Link
                            to="/"
                            className={cn(
                                "mr-2 flex items-center gap-1.5 text-sm font-medium transition-colors",
                                "text-slate-500 hover:text-slate-900",
                                "dark:text-slate-400 dark:hover:text-white",
                            )}
                        >
                            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                            Back
                        </Link>
                    )}

                    <Link to="/" className="flex items-center gap-3">
                        <div
                            className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-xl shadow-sm",
                                "bg-gradient-to-br from-purple-500 to-purple-600",
                                "shadow-purple-200 dark:shadow-none",
                            )}
                        >
                            <FileText className="h-5 w-5 text-white" />
                        </div>

                        <span
                            className={cn(
                                "text-xl font-bold tracking-tight transition-colors",
                                "text-slate-800 dark:text-white",
                            )}
                        >
                            Forms
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />

                    {isHome && (
                        <Link
                            to="/forms/new"
                            className={cn(
                                "group flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-sm transition-all duration-300",
                                "bg-slate-900 text-white hover:bg-purple-600 hover:shadow-md hover:shadow-purple-200",
                                "dark:bg-purple-600 dark:hover:bg-purple-500 dark:hover:shadow-purple-900/20",
                            )}
                        >
                            <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
                            New Form
                        </Link>
                    )}

                    {isFormBuilder && onSave && (
                        <motion.button
                            onClick={onSave}
                            disabled={isSaving || !canSave}
                            whileTap={{ scale: 0.97 }}
                            className={cn(
                                "rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm transition-all",
                                "bg-purple-600 text-white shadow-purple-200 hover:bg-purple-700 hover:shadow-md",
                                "dark:shadow-none",
                                "disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none",
                                "dark:disabled:bg-slate-800",
                            )}
                        >
                            {isSaving ? "Saving..." : "Save Form"}
                        </motion.button>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
